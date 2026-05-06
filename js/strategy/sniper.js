(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  const TAIL_TYPE_LIMIT_FOR_ASSASSINATION = 3;
  const MAX_FORCE_SEARCH_DEPTH = 7;

  App.strategies.sniper = {
    id: "sniper",
    name: "スナイパー戦略",
    description:
      "普段は最悪ケース生存で逃げつつ、返せる文字種が少ない局面では強制勝ち筋を探索して刺しに行きます。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const source = context.availableIndex || context.allWords;

      const evaluatedCandidates = candidates.map((wordObj) => {
        return evaluateCandidate(wordObj, context, source);
      });

      const immediateWinCandidates = evaluatedCandidates.filter((item) => {
        return item.isImmediateWin;
      });

      if (immediateWinCandidates.length > 0) {
        const selected = pickRandom(
          immediateWinCandidates.map((item) => item.wordObj)
        );

        debugLog(context, evaluatedCandidates, selected, "immediate-win");

        return selected;
      }

      const forcedWinCandidates = evaluatedCandidates.filter((item) => {
        return item.isForcedWin;
      });

      if (forcedWinCandidates.length > 0) {
        const bestForcedWin = forcedWinCandidates.reduce((best, current) => {
          if (!best) return current;

          return compareForcedWinEvaluation(current, best) > 0
            ? current
            : best;
        }, null);

        const bestCandidates = forcedWinCandidates
          .filter((item) => {
            return isSameForcedWinEvaluation(item, bestForcedWin);
          })
          .map((item) => item.wordObj);

        const selected = pickRandom(bestCandidates);

        debugLog(context, evaluatedCandidates, selected, "forced-win-snipe");

        return selected;
      }

      const bestSurvival = evaluatedCandidates.reduce((best, current) => {
        if (!best) return current;

        return compareSurvivalEvaluation(current, best) > 0
          ? current
          : best;
      }, null);

      const bestCandidates = evaluatedCandidates
        .filter((item) => {
          return isSameSurvivalEvaluation(item, bestSurvival);
        })
        .map((item) => item.wordObj);

      const selected = pickRandom(bestCandidates);

      debugLog(context, evaluatedCandidates, selected, "fallback-survival");

      return selected;
    }
  };

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

    if (opponentCandidates.length === 0) {
      return {
        wordObj,
        isImmediateWin: true,
        isForcedWin: true,
        forcedWinDepth: 1,

        opponentCandidateCount: 0,
        opponentTailTypeCount: 0,

        myNextCandidateCounts: [],
        minMyNextCandidateCount: Infinity,
        averageMyNextCandidateCount: Infinity,
        dangerReplyCount: 0
      };
    }

    const myNextCandidateCounts = opponentCandidates.map((opponentWord) => {
      const usedAfterOpponentWord = new Set(usedAfterMyWord);
      usedAfterOpponentWord.add(opponentWord.word);

      const myNextCandidates = App.rules.getCandidates(
        opponentWord.tail,
        source,
        usedAfterOpponentWord,
        context.settings,
        { excludeN: true }
      );

      return myNextCandidates.length;
    });

    const minMyNextCandidateCount = Math.min(...myNextCandidateCounts);

    const averageMyNextCandidateCount =
      myNextCandidateCounts.reduce((sum, count) => {
        return sum + count;
      }, 0) / myNextCandidateCounts.length;

    const dangerReplyCount = myNextCandidateCounts.filter((count) => {
      return count === 0;
    }).length;

    const opponentTailTypeCount = countTailTypes(
      opponentCandidates,
      context.settings
    );

    let isForcedWin = false;
    let forcedWinDepth = null;

    if (opponentTailTypeCount <= TAIL_TYPE_LIMIT_FOR_ASSASSINATION) {
      const searchResult = checkForcedWinAfterMyWord(
        opponentCandidates,
        usedAfterMyWord,
        source,
        context.settings,
        MAX_FORCE_SEARCH_DEPTH
      );

      isForcedWin = searchResult.isForcedWin;
      forcedWinDepth = searchResult.forcedWinDepth;
    }

    return {
      wordObj,
      isImmediateWin: false,
      isForcedWin,
      forcedWinDepth,

      opponentCandidateCount: opponentCandidates.length,
      opponentTailTypeCount,

      myNextCandidateCounts,
      minMyNextCandidateCount,
      averageMyNextCandidateCount,
      dangerReplyCount
    };
  }

  function checkForcedWinAfterMyWord(
    opponentCandidates,
    usedAfterMyWord,
    source,
    settings,
    maxDepth
  ) {
    if (maxDepth <= 1) {
      return {
        isForcedWin: false,
        forcedWinDepth: null
      };
    }

    let worstCaseWinDepth = 0;

    for (const opponentWord of opponentCandidates) {
      const usedAfterOpponentWord = new Set(usedAfterMyWord);
      usedAfterOpponentWord.add(opponentWord.word);

      const subDepth = findForcedWinDepthForMyTurn(
        opponentWord.tail,
        source,
        usedAfterOpponentWord,
        settings,
        maxDepth - 2
      );

      if (subDepth === null) {
        return {
          isForcedWin: false,
          forcedWinDepth: null
        };
      }

      worstCaseWinDepth = Math.max(worstCaseWinDepth, subDepth);
    }

    return {
      isForcedWin: true,
      forcedWinDepth: 2 + worstCaseWinDepth
    };
  }

  function findForcedWinDepthForMyTurn(
    requiredHead,
    source,
    temporaryUsedWords,
    settings,
    remainingDepth
  ) {
    if (remainingDepth <= 0) {
      return null;
    }

    const myCandidates = App.rules.getCandidates(
      requiredHead,
      source,
      temporaryUsedWords,
      settings,
      { excludeN: true }
    );

    if (myCandidates.length === 0) {
      return null;
    }

    let bestForcedWinDepth = null;

    for (const myWord of myCandidates) {
      const usedAfterMyWord = new Set(temporaryUsedWords);
      usedAfterMyWord.add(myWord.word);

      const opponentCandidates = App.rules.getCandidates(
        myWord.tail,
        source,
        usedAfterMyWord,
        settings,
        { excludeN: true }
      );

      if (opponentCandidates.length === 0) {
        bestForcedWinDepth = chooseShorterDepth(bestForcedWinDepth, 1);
        continue;
      }

      if (remainingDepth <= 2) {
        continue;
      }

      const opponentTailTypeCount = countTailTypes(
        opponentCandidates,
        settings
      );

      if (opponentTailTypeCount > TAIL_TYPE_LIMIT_FOR_ASSASSINATION) {
        continue;
      }

      let allOpponentRepliesAreWinning = true;
      let worstCaseSubDepth = 0;

      for (const opponentWord of opponentCandidates) {
        const usedAfterOpponentWord = new Set(usedAfterMyWord);
        usedAfterOpponentWord.add(opponentWord.word);

        const subDepth = findForcedWinDepthForMyTurn(
          opponentWord.tail,
          source,
          usedAfterOpponentWord,
          settings,
          remainingDepth - 2
        );

        if (subDepth === null) {
          allOpponentRepliesAreWinning = false;
          break;
        }

        worstCaseSubDepth = Math.max(worstCaseSubDepth, subDepth);
      }

      if (allOpponentRepliesAreWinning) {
        const forcedWinDepth = 2 + worstCaseSubDepth;
        bestForcedWinDepth = chooseShorterDepth(
          bestForcedWinDepth,
          forcedWinDepth
        );
      }
    }

    return bestForcedWinDepth;
  }

  function chooseShorterDepth(currentBest, candidateDepth) {
    if (currentBest === null) return candidateDepth;
    return Math.min(currentBest, candidateDepth);
  }

  function countTailTypes(wordObjects, settings) {
    const tailTypes = new Set();

    for (const wordObj of wordObjects) {
      const key = App.rules
        .getEquivalentChars(wordObj.tail, settings)
        .join("|");

      tailTypes.add(key);
    }

    return tailTypes.size;
  }

  function compareForcedWinEvaluation(a, b) {
    if (a.forcedWinDepth !== b.forcedWinDepth) {
      return b.forcedWinDepth - a.forcedWinDepth;
    }

    if (a.opponentTailTypeCount !== b.opponentTailTypeCount) {
      return b.opponentTailTypeCount - a.opponentTailTypeCount;
    }

    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return b.opponentCandidateCount - a.opponentCandidateCount;
    }

    return compareSurvivalEvaluation(a, b);
  }

  function isSameForcedWinEvaluation(a, b) {
    return (
      a.forcedWinDepth === b.forcedWinDepth &&
      a.opponentTailTypeCount === b.opponentTailTypeCount &&
      a.opponentCandidateCount === b.opponentCandidateCount &&
      isSameSurvivalEvaluation(a, b)
    );
  }

  function compareSurvivalEvaluation(a, b) {
    if (a.minMyNextCandidateCount !== b.minMyNextCandidateCount) {
      return a.minMyNextCandidateCount - b.minMyNextCandidateCount;
    }

    if (a.dangerReplyCount !== b.dangerReplyCount) {
      return b.dangerReplyCount - a.dangerReplyCount;
    }

    if (a.averageMyNextCandidateCount !== b.averageMyNextCandidateCount) {
      return a.averageMyNextCandidateCount - b.averageMyNextCandidateCount;
    }

    if (a.opponentTailTypeCount !== b.opponentTailTypeCount) {
      return b.opponentTailTypeCount - a.opponentTailTypeCount;
    }

    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return b.opponentCandidateCount - a.opponentCandidateCount;
    }

    return 0;
  }

  function isSameSurvivalEvaluation(a, b) {
    return (
      a.minMyNextCandidateCount === b.minMyNextCandidateCount &&
      a.dangerReplyCount === b.dangerReplyCount &&
      a.averageMyNextCandidateCount === b.averageMyNextCandidateCount &&
      a.opponentTailTypeCount === b.opponentTailTypeCount &&
      a.opponentCandidateCount === b.opponentCandidateCount
    );
  }

  function pickRandom(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  function debugLog(context, evaluatedCandidates, selected, reason) {
    if (
      !App.settings ||
      !App.settings.isDebugMode ||
      !App.settings.isDebugMode()
    ) {
      return;
    }

    console.log("[sniper]", {
      requiredHead: context.requiredHead,
      reason,
      selected: selected ? selected.word : null,
      constants: {
        TAIL_TYPE_LIMIT_FOR_ASSASSINATION,
        MAX_FORCE_SEARCH_DEPTH
      },
      evaluatedCandidates: evaluatedCandidates.map((item) => ({
        word: item.wordObj.word,
        tail: item.wordObj.tail,

        isImmediateWin: item.isImmediateWin,
        isForcedWin: item.isForcedWin,
        forcedWinDepth: item.forcedWinDepth,

        opponentCandidateCount: item.opponentCandidateCount,
        opponentTailTypeCount: item.opponentTailTypeCount,

        minMyNextCandidateCount: item.minMyNextCandidateCount,
        averageMyNextCandidateCount: item.averageMyNextCandidateCount,
        dangerReplyCount: item.dangerReplyCount,
        myNextCandidateCounts: item.myNextCandidateCounts
      }))
    });
  }
})(window.App);

/*
【戦略名】
スナイパー戦略 / sniper

【基本思想】
この戦略は、普段は「最悪ケース生存戦略」のように防御的に立ち回る。
ただし、自分の候補手の中に、相手の応答範囲を十分に狭め、
そこから強制勝ち筋を探索できる手が見えた場合だけ、攻撃に転じる。

「常に攻める」のではなく、
  勝ちが見えた瞬間だけ撃つ
ため、「スナイパー戦略」と呼ぶ。

【通常時の挙動】
強制勝ち筋が見つからない場合は、以下の優先順位で手を選ぶ。

1. 相手の最善返し後に残る自分候補数の最小値が大きい手
2. 自分候補0になる危険返しが少ない手
3. 相手返し後の自分候補数の平均が大きい手
4. 相手が返せる文字種類が少ない手
5. 相手候補数が少ない手
6. 同点ならランダム

これは、おおむね worst_case_survival に近い防御挙動である。

【暗殺探索に入る条件】
この戦略では、相手候補数そのものではなく、
  相手が次にこちらへ返せる文字の種類数
を見る。

具体的には、自分がある単語を出した後、
相手候補群の語尾を集める。

例：
  相手候補A → ル
  相手候補B → ル
  相手候補C → リ
  相手候補D → ス

この場合、相手候補は4語だが、返せる文字種類は
  ル / リ / ス
の3種類である。

この文字種類数が TAIL_TYPE_LIMIT_FOR_ASSASSINATION 以下、
初期値では3以下のときだけ、強制勝ち探索に入る。

【強制勝ち探索】
強制勝ち探索では、
  自分の手 → 相手の応答 → 自分の手 → 相手の応答 → ...
を深さ制限つきで読む。

自分の手番では、
  1つでも勝てる手があれば勝ち
と考える。

相手の手番では、
  相手がどの手を返しても勝てるなら勝ち
と考える。

つまり、
  自分側は OR
  相手側は AND
で判定する。

これは限定幅のミニマックス探索に近い。

【即勝ち】
自分の候補手の中に、相手候補を0にする手があれば最優先する。

【強制勝ち候補の選び方】
強制勝ち候補が複数ある場合は、以下を優先する。

1. より短い手数で勝てるもの
2. 相手が返せる文字種類が少ないもの
3. 相手候補数が少ないもの
4. 通常時の防御評価が良いもの
5. 同点ならランダム

【強み】
・普段は防御的なので、雑に攻めて自滅しにくい。
・即勝ちだけでなく、数手先の強制勝ち筋を拾える。
・worst_case_survival が見逃しがちな「勝ちが確定している細い一本道」を発見できる。
・相手候補数ではなく返せる文字種類を見るため、相手候補が多くても実質的な分岐が少ない局面を狙える。
・防御型戦略同士で長引く試合において、勝ち筋が見えた瞬間だけ抜け出せる可能性がある。

【弱み】
・計算量は重い。
・強制勝ち探索は深さ制限つきなので、深さ制限より先の勝ち筋は見えない。
・相手が返せる文字種類が多い局面では、暗殺探索に入らず防御戦略として振る舞う。
・平均的に強い手よりも、確定勝ち筋の探索を優先するため、ランダム相手には過剰に慎重な場合がある。
・TAIL_TYPE_LIMIT_FOR_ASSASSINATION と MAX_FORCE_SEARCH_DEPTH の値に性能が左右される。

【仮想敵】
主な仮想敵は以下。

・worst_case_survival
  防御寄り同士の対戦で、強制勝ち筋を見つけて刺せるかを見る。

・safe_minimize_opponent
  相手候補を狭めてくる相手に対し、逆に勝ち筋を読めるかを見る。

・minimize_opponent
  単純な候補数最小化に対し、返せる文字種類と強制勝ち探索で上回れるかを見る。

・将来的な終盤探索型戦略
  深さ制限つき探索でどの程度対抗できるかを見る。

【調整値】
TAIL_TYPE_LIMIT_FOR_ASSASSINATION:
  暗殺探索に入るための、相手が返せる文字種類数の上限。
  初期値は3。

MAX_FORCE_SEARCH_DEPTH:
  強制勝ち探索の最大深さ。
  初期値は7。
  大きくすると強くなる可能性があるが、重くなる。

【この戦略の位置づけ】
random:
  何も読まない。

random_v2:
  即勝ちだけ見る。

minimize_opponent:
  相手候補数を減らす。

safe_minimize_opponent:
  相手に即決まり手を渡さず、相手候補数を減らす。

worst_case_survival:
  相手が最善の返しをしてきても、自分の次候補が最大限残るようにする。

sniper:
  普段は worst_case_survival 的に逃げる。
  ただし、返せる文字種類が少ない局面では強制勝ち探索を行い、
  勝ちが確定している手があればそこに刺しに行く。
*/