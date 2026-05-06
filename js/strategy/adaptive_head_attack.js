(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  const gameMemory = new Map();

  App.strategies.adaptiveHeadAttack = {
    id: "adaptiveHeadAttack",
    name: "可変〇攻め戦略",
    description:
      "相手候補が少なくなる攻め対象を選び、続行不能になったら次の攻め対象候補を順に試して切り替えます。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const source = context.availableIndex || context.allWords;
      const gameKey = getGameKey(context);
      const memory = getMemory(gameKey);

      const evaluated = candidates.map((wordObj) => {
        return evaluateCandidate(wordObj, context, source);
      });

      // 1. 即勝ち手があれば最優先
      const immediateWins = evaluated.filter((item) => item.isImmediateWin);

      if (immediateWins.length > 0) {
        const selected = pickBest(immediateWins).wordObj;
        debugLog(context, memory, evaluated, selected, "immediate-win");
        return selected;
      }

      // 2. 相手に決まり手を渡さない安全手を優先
      const safeCandidates = evaluated.filter((item) => {
        return !item.givesOpponentCheckmate;
      });

      const mainPool =
        safeCandidates.length > 0
          ? safeCandidates
          : evaluated;

      // 3. 初回は targetHead 未設定なので、候補ターゲットを順位づけして先頭から試す
      if (!memory.targetHead) {
        const selected = selectBySwitchingTarget(
          mainPool,
          context,
          memory,
          "initial-target"
        );

        if (selected) {
          debugLog(context, memory, evaluated, selected, "initial-target");
          return selected;
        }
      }

      // 4. 現在の targetHead を渡せる手があるなら、その攻めを継続
      const currentTargetCandidates = mainPool.filter((item) => {
        return isTailMatch(item.wordObj.tail, memory.targetHead, context.settings);
      });

      if (currentTargetCandidates.length > 0) {
        const selected = pickBest(currentTargetCandidates).wordObj;
        debugLog(context, memory, evaluated, selected, "continue-current-target");
        return selected;
      }

      // 5. 現在の攻め対象を渡せなくなったので、
      //    次の targetHead 候補を順番に試す
      const switchedSelected = selectBySwitchingTarget(
        mainPool,
        context,
        memory,
        "switch-target"
      );

      if (switchedSelected) {
        debugLog(context, memory, evaluated, switchedSelected, "switch-target");
        return switchedSelected;
      }

      // 6. どの targetHead に切り替えても攻められない場合は、その場で一番よさそうな手
      const selected = pickBest(mainPool).wordObj;
      debugLog(context, memory, evaluated, selected, "fallback-best");
      return selected;
    }
  };

  function getGameKey(context) {
    if (context.simulation && context.simulation.gameIndex !== undefined) {
      return `simulation-${context.simulation.gameIndex}`;
    }

    if (context.state && context.state.gameCount !== undefined) {
      return `game-${context.state.gameCount}`;
    }

    return "default";
  }

  function getMemory(gameKey) {
    if (!gameMemory.has(gameKey)) {
      gameMemory.set(gameKey, {
        targetHead: null
      });
    }

    return gameMemory.get(gameKey);
  }

  function selectBySwitchingTarget(evaluatedCandidates, context, memory, reason) {
    const rankedTargets = getRankedTargetHeads(evaluatedCandidates, context.settings);

    for (const targetHead of rankedTargets) {
      const targetCandidates = evaluatedCandidates.filter((item) => {
        return isTailMatch(item.wordObj.tail, targetHead, context.settings);
      });

      if (targetCandidates.length === 0) {
        continue;
      }

      memory.targetHead = targetHead;

      return pickBest(targetCandidates).wordObj;
    }

    return null;
  }

  function getRankedTargetHeads(evaluatedCandidates, settings) {
    const grouped = new Map();

    for (const item of evaluatedCandidates) {
      const key = makeTailTypeKey(item.wordObj.tail, settings);

      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          targetHead: item.wordObj.tail,
          items: []
        });
      }

      grouped.get(key).items.push(item);
    }

    return [...grouped.values()]
      .map((group) => {
        return {
          key: group.key,
          targetHead: group.targetHead,
          bestItem: pickBest(group.items),
          itemCount: group.items.length
        };
      })
      .sort((a, b) => {
        return compareTargetGroup(b, a);
      })
      .map((group) => group.targetHead);
  }

  function compareTargetGroup(a, b) {
    const itemCompare = compareEvaluation(a.bestItem, b.bestItem);

    if (itemCompare !== 0) {
      return itemCompare;
    }

    // 同じくらい強いなら、その攻め対象へ行ける手が多い方を優先
    if (a.itemCount !== b.itemCount) {
      return a.itemCount - b.itemCount;
    }

    return 0;
  }

  function evaluateCandidate(wordObj, context, source) {
    const usedAfterMyWord = new Set(context.usedWords || []);
    usedAfterMyWord.add(wordObj.word);

    const opponentCandidates = App.rules.getCandidates(
      wordObj.tail,
      source,
      usedAfterMyWord,
      context.settings,
      { excludeN: true }
    );

    const isImmediateWin = opponentCandidates.length === 0;

    let givesOpponentCheckmate = false;
    let minMyNextCandidateCount = Infinity;
    let averageMyNextCandidateCount = Infinity;
    let dangerReplyCount = 0;

    if (!isImmediateWin) {
      const myNextCounts = opponentCandidates.map((opponentWord) => {
        const usedAfterOpponent = new Set(usedAfterMyWord);
        usedAfterOpponent.add(opponentWord.word);

        const myNextCandidates = App.rules.getCandidates(
          opponentWord.tail,
          source,
          usedAfterOpponent,
          context.settings,
          { excludeN: true }
        );

        return myNextCandidates.length;
      });

      minMyNextCandidateCount = Math.min(...myNextCounts);
      averageMyNextCandidateCount =
        myNextCounts.reduce((sum, count) => sum + count, 0) / myNextCounts.length;

      dangerReplyCount = myNextCounts.filter((count) => count === 0).length;
      givesOpponentCheckmate = dangerReplyCount > 0;
    }

    return {
      wordObj,
      isImmediateWin,
      givesOpponentCheckmate,
      opponentCandidateCount: opponentCandidates.length,
      opponentTailTypeCount: countTailTypes(opponentCandidates, context.settings),
      minMyNextCandidateCount,
      averageMyNextCandidateCount,
      dangerReplyCount
    };
  }

  function pickBest(items) {
    const best = items.reduce((currentBest, item) => {
      if (!currentBest) return item;
      return compareEvaluation(item, currentBest) > 0 ? item : currentBest;
    }, null);

    const tied = items.filter((item) => {
      return isSameEvaluation(item, best);
    });

    return pickRandom(tied);
  }

  function compareEvaluation(a, b) {
    // 相手候補が少ないほどよい
    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return b.opponentCandidateCount - a.opponentCandidateCount;
    }

    // 相手が返せる文字種類が少ないほどよい
    if (a.opponentTailTypeCount !== b.opponentTailTypeCount) {
      return b.opponentTailTypeCount - a.opponentTailTypeCount;
    }

    // 危険返しが少ないほどよい
    if (a.dangerReplyCount !== b.dangerReplyCount) {
      return b.dangerReplyCount - a.dangerReplyCount;
    }

    // 最悪ケースで自分候補が広く残るほどよい
    if (a.minMyNextCandidateCount !== b.minMyNextCandidateCount) {
      return a.minMyNextCandidateCount - b.minMyNextCandidateCount;
    }

    // 平均的にも広いほどよい
    if (a.averageMyNextCandidateCount !== b.averageMyNextCandidateCount) {
      return a.averageMyNextCandidateCount - b.averageMyNextCandidateCount;
    }

    return 0;
  }

  function isSameEvaluation(a, b) {
    return (
      a.opponentCandidateCount === b.opponentCandidateCount &&
      a.opponentTailTypeCount === b.opponentTailTypeCount &&
      a.dangerReplyCount === b.dangerReplyCount &&
      a.minMyNextCandidateCount === b.minMyNextCandidateCount &&
      a.averageMyNextCandidateCount === b.averageMyNextCandidateCount
    );
  }

  function isTailMatch(tail, targetHead, settings) {
    if (!targetHead) {
      return false;
    }

    return App.rules
      .getEquivalentChars(targetHead, settings)
      .includes(App.rules.normalizeChar(tail));
  }

  function makeTailTypeKey(tail, settings) {
    return App.rules
      .getEquivalentChars(tail, settings)
      .join("|");
  }

  function countTailTypes(wordObjects, settings) {
    const tailTypes = new Set();

    for (const wordObj of wordObjects) {
      tailTypes.add(makeTailTypeKey(wordObj.tail, settings));
    }

    return tailTypes.size;
  }

  function pickRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  function debugLog(context, memory, evaluated, selected, reason) {
    if (
      !App.settings ||
      !App.settings.isDebugMode ||
      !App.settings.isDebugMode()
    ) {
      return;
    }

    console.log("[adaptive_head_attack]", {
      reason,
      currentTargetHead: memory.targetHead,
      requiredHead: context.requiredHead,
      selected: selected ? selected.word : null,
      rankedTargets: getRankedTargetHeads(
        evaluated.filter((item) => !item.givesOpponentCheckmate),
        context.settings
      ),
      evaluated: evaluated.map((item) => ({
        word: item.wordObj.word,
        head: item.wordObj.head,
        tail: item.wordObj.tail,
        isImmediateWin: item.isImmediateWin,
        givesOpponentCheckmate: item.givesOpponentCheckmate,
        opponentCandidateCount: item.opponentCandidateCount,
        opponentTailTypeCount: item.opponentTailTypeCount,
        dangerReplyCount: item.dangerReplyCount,
        minMyNextCandidateCount: item.minMyNextCandidateCount,
        averageMyNextCandidateCount: item.averageMyNextCandidateCount
      }))
    });
  }
})(window.App);

/*
【戦略名】
可変〇攻め戦略 / adaptive_head_attack

【基本思想】
その時点で最も攻めやすそうな文字を targetHead として選び、
その文字を相手に渡せる限りは同じ攻めを継続する。

固定〇攻めと違い、最初の攻め対象も固定値ではない。
初回も、続行不能後の切り替え時と同じ基準で targetHead を選ぶ。

【重要な仕様】
この戦略は、毎ターン targetHead を選び直す戦略ではない。

流れは以下。

1. 初回、自分の候補手を評価する。
2. 候補手の語尾を、攻め対象候補として順位づけする。
3. 順位が高い targetHead から順に、それを相手に渡せる手があるか確認する。
4. 渡せる手があれば、その targetHead を memory.targetHead に保存し、攻めを開始する。
5. 以後、その targetHead を相手に渡せる安全手がある限り、同じ攻めを継続する。
6. 現在の targetHead を渡せる手がなくなった時点で、再び攻め対象候補を順位づけする。
7. ある targetHead に変更しても渡せる手がなければ、さらに次の targetHead 候補へ進む。
8. 渡せる targetHead が見つかるまでこれを繰り返す。
9. どの targetHead でも攻められない場合は、その場で最もよさそうな手を選ぶ。

つまり、
  強そうな〇攻めを選ぶ
  ↓
  その攻めを継続
  ↓
  続行不能
  ↓
  次の候補targetHeadを順に試す
  ↓
  見つかったtargetHeadへ切り替え
という挙動をする。

【優先順位】
1. 即勝ち手
2. 相手に決まり手を渡さない安全手
3. 現在の targetHead を相手に渡せる手
4. targetHead を渡せなくなったら、候補 targetHead を順位順に試す
5. 新 targetHead を渡せる手
6. それも無理なら、その場で最も相手候補が少ない手

【攻め対象の選び方】
攻め対象候補は、現在出せる候補手の語尾から作る。

基本的には、
  相手候補数が少なくなる語尾
を優先する。

同点の場合は、
  相手が返せる文字種類数
  危険返しの少なさ
  自分の次候補の広さ
などで比較する。

【攻め対象の切り替え条件】
現在の targetHead を相手に渡せる候補が mainPool に存在しなくなったとき。

mainPool は原則として、
  相手に決まり手を渡さない安全手
で構成される。

安全手が存在しない場合のみ、全候補から選ぶ。

【強み】
・固定〇攻めより柔軟。
・最初からその局面で有効そうな攻め文字を選べる。
・一度攻め対象を決めたら継続するため、ゲームメイクの一貫性がある。
・攻め対象が枯れたら、次善・三善の攻め対象へ順に移行できる。
・相手の防御札を消費させた後、別の攻めへ切り替えられる可能性がある。

【弱み】
・現在の攻め対象にこだわるため、途中でもっと良い攻め対象が出ても即座には切り替えない。
・切り替え判断は「現在の targetHead を渡せる安全手がないかどうか」に依存する。
・長期的な資源管理まではしていない。
・攻め対象の選び方は局所評価であり、完全な勝ち筋探索ではない。

【仮想敵】
・random
・random_v2
・minimize_opponent
・safe_minimize_opponent
・worst_case_survival
・sniper

【この戦略の位置づけ】
target_head_attack:
  固定の1文字を攻め続ける。

adaptive_head_attack:
  初回にその場で有効そうな攻め文字を選ぶ。
  その攻めが続行不能になったら、targetHead候補を順に試し、
  使えるものが見つかった時点で targetHead 自体を更新して別の〇攻めへ移行する。
*/