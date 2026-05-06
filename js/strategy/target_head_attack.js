(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  const TARGET_HEAD = "ル";

  App.strategies.targetHeadAttack = {
    id: "targetHeadAttack",
    name: `${TARGET_HEAD}攻め戦略`,
    description:
      `即勝ちと安全性を優先しつつ、相手に「${TARGET_HEAD}」を渡す手を好みます。`,

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const source = context.availableIndex || context.allWords;

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

      const targetCandidates = mainPool.filter((item) => {
        return item.isTargetAttack;
      });

      if (targetCandidates.length > 0) {
        return pickBest(targetCandidates).wordObj;
      }

      return pickBest(mainPool).wordObj;
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
      isTargetAttack: isTailMatch(wordObj.tail, TARGET_HEAD, context.settings),
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

  function pickRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }
})(window.App);

/*
【戦略名】
固定〇攻め戦略 / target_head_attack

【基本思想】
指定した TARGET_HEAD を相手に渡すことを好む戦略。
初期設定では TARGET_HEAD = "ル" のため、ル攻め戦略として動く。

【優先順位】
1. 即勝ち手
2. 相手に決まり手を渡さない安全手
3. TARGET_HEAD を相手に渡せる手
4. 相手候補数が少ない手
5. 相手が返せる文字種類が少ない手
6. 危険返しが少ない手
7. 自分の次候補が広く残る手
8. 同点ならランダム

【強み】
・単純な〇攻めよりも、相手の即勝ち返しを避けられる。
・ル攻めなど、特定文字の弱さを明示的に突ける。
・挙動が分かりやすく、特定文字攻めの強さを検証しやすい。

【弱み】
・TARGET_HEAD に防御札が残っていると、そこをうまく処理できない場合がある。
・攻め対象が固定なので、対象文字のプールが枯れた後はやや硬直的。
・相手がその文字に強い場合でも、攻め対象を自動変更しない。

【仮想敵】
・random
・minimize_opponent
・safe_minimize_opponent
・ルチャブルなどの防御札を持つ相手への検証用
*/