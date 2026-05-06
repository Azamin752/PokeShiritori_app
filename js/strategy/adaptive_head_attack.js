(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  const DEFAULT_TARGET_HEAD = "ル";

  const gameMemory = new Map();

  App.strategies.adaptiveHeadAttack = {
    id: "adaptiveHeadAttack",
    name: "可変〇攻め戦略",
    description:
      "攻め対象の文字を決めて攻め続け、続行不能になったら相手候補が少ない文字へ切り替えます。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const source = context.availableIndex || context.allWords;
      const gameKey = getGameKey(context);
      const memory = getMemory(gameKey, context);

      const evaluated = candidates.map((wordObj) => {
        return evaluateCandidate(wordObj, context, source);
      });

      const immediateWins = evaluated.filter((item) => item.isImmediateWin);

      if (immediateWins.length > 0) {
        return pickBest(immediateWins).wordObj;
      }

      const safeCandidates = evaluated.filter((item) => {
        return !item.givesOpponentCheckmate;
      });

      const mainPool = safeCandidates.length > 0
        ? safeCandidates
        : evaluated;

      let currentTargetCandidates = mainPool.filter((item) => {
        return isTailMatch(item.wordObj.tail, memory.targetHead, context.settings);
      });

      if (currentTargetCandidates.length > 0) {
        return pickBest(currentTargetCandidates).wordObj;
      }

      memory.targetHead = chooseBestTargetHead(mainPool, context.settings);

      currentTargetCandidates = mainPool.filter((item) => {
        return isTailMatch(item.wordObj.tail, memory.targetHead, context.settings);
      });

      if (currentTargetCandidates.length > 0) {
        return pickBest(currentTargetCandidates).wordObj;
      }

      return pickBest(mainPool).wordObj;
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

  function getMemory(gameKey, context) {
    if (!gameMemory.has(gameKey)) {
      gameMemory.set(gameKey, {
        targetHead: chooseBestTargetHeadFromContext(context) || DEFAULT_TARGET_HEAD
      });
    }

    return gameMemory.get(gameKey);
  }

  function chooseBestTargetHeadFromContext(context) {
    const candidates = context.candidateWords || [];
    const source = context.availableIndex || context.allWords;

    const evaluated = candidates.map((wordObj) => {
      return evaluateCandidate(wordObj, context, source);
    });

    const safeCandidates = evaluated.filter((item) => {
      return !item.givesOpponentCheckmate;
    });

    const pool = safeCandidates.length > 0
      ? safeCandidates
      : evaluated;

    return chooseBestTargetHead(pool, context.settings);
  }

  function chooseBestTargetHead(evaluatedCandidates, settings) {
    if (!evaluatedCandidates || evaluatedCandidates.length === 0) {
      return DEFAULT_TARGET_HEAD;
    }

    const grouped = new Map();

    for (const item of evaluatedCandidates) {
      const key = makeTailTypeKey(item.wordObj.tail, settings);

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key).push(item);
    }

    let bestGroup = null;

    for (const [key, items] of grouped.entries()) {
      const bestItemInGroup = pickBest(items);

      const groupScore = {
        key,
        targetHead: bestItemInGroup.wordObj.tail,
        bestItem: bestItemInGroup,
        itemCount: items.length
      };

      if (!bestGroup || compareTargetGroup(groupScore, bestGroup) > 0) {
        bestGroup = groupScore;
      }
    }

    return bestGroup ? bestGroup.targetHead : DEFAULT_TARGET_HEAD;
  }

  function compareTargetGroup(a, b) {
    const itemCompare = compareEvaluation(a.bestItem, b.bestItem);

    if (itemCompare !== 0) {
      return itemCompare;
    }

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
    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return b.opponentCandidateCount - a.opponentCandidateCount;
    }

    if (a.opponentTailTypeCount !== b.opponentTailTypeCount) {
      return b.opponentTailTypeCount - a.opponentTailTypeCount;
    }

    if (a.dangerReplyCount !== b.dangerReplyCount) {
      return b.dangerReplyCount - a.dangerReplyCount;
    }

    if (a.minMyNextCandidateCount !== b.minMyNextCandidateCount) {
      return a.minMyNextCandidateCount - b.minMyNextCandidateCount;
    }

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
})(window.App);

/*
【戦略名】
可変〇攻め戦略 / adaptive_head_attack

【基本思想】
固定の〇攻めではなく、攻め対象を試合中に切り替える戦略。

最初に攻め対象を決め、
その攻めが続行できる限りは同じ文字を相手に渡し続ける。
続行不能になったら、その時点で一番強そうな攻め対象へ切り替える。

【優先順位】
1. 即勝ち手
2. 相手に決まり手を渡さない安全手
3. 現在の攻め対象を相手に渡せる手
4. 現在の攻め対象を渡せない場合、攻め対象を切り替える
5. 新しい攻め対象を渡せる手
6. それも無理なら、その場で最も相手候補が少ない手

【攻め対象の決め方】
その時点の候補手の語尾をグループ化し、
各語尾を渡した場合の相手候補数・相手が返せる文字種類・危険返し数などを見る。
最も相手を狭められそうな語尾を、次の攻め対象にする。

【強み】
・固定〇攻めより柔軟。
・ル攻めができなくなったらリ攻め、ス攻めなどへ移行できる。
・相手の防御札を消費させた後に別の攻めへ切り替えられる可能性がある。
・即勝ちと安全性を優先するため、単純な〇攻めより自滅しにくい。

【弱み】
・攻め対象を切り替える判断が局所的。
・長期的な資源管理まではしていない。
・現在の攻め対象を維持することにこだわるため、より良い攻め対象が途中で生じても、続行可能なら切り替えない。
・メモリを使って試合中の攻め対象を保持するため、戦略としては固定〇攻めより少し複雑。

【仮想敵】
・random
・random_v2
・minimize_opponent
・safe_minimize_opponent
・worst_case_survival

【この戦略の位置づけ】
target_head_attack:
  1つの文字を固定で攻める。

adaptive_head_attack:
  1つの文字を攻め続けるが、続行不能になったら別の強い攻め文字へ切り替える。
*/