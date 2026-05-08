(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  /*
   * 協調延命探索の深さ。
   * 固まるなら 6、物足りなければ 10。
   */
  const MAX_COOPERATIVE_DEPTH = 8;

  /*
   * 各局面で深く見る候補数。
   * 大きいほど長いルートを見つけやすいが重い。
   */
  const MAX_BRANCHES_PER_NODE = 8;

  /*
   * 1手選択あたりの探索ノード上限。
   */
  const MAX_NODES_PER_MOVE = 1800;

  App.strategies.keepAlive = {
    id: "keepAlive",
    name: "延命戦略",
    description:
      "自分も相手も即詰みを避ける前提で、できるだけ長くラリーを続けようとします。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const source = context.availableIndex || context.allWords;

      const budget = {
        nodes: 0,
        maxNodes: MAX_NODES_PER_MOVE,
        wasCutOff: false
      };

      const evaluated = candidates.map((wordObj) => {
        return evaluateRootMove(wordObj, context, source, budget);
      });

      /*
       * 1. 相手を即詰ませない手があるなら、即勝ち手は避ける。
       */
      const nonKillingMoves = evaluated.filter((item) => {
        return !item.isImmediateWin;
      });

      const pool =
        nonKillingMoves.length > 0
          ? nonKillingMoves
          : evaluated;

      /*
       * 2. 相手がこちらを生かせる返しを持つ手を優先。
       *    つまり、相手候補はあるが、その全てがこちらを即死させるような手は避ける。
       */
      const mutuallyContinuableMoves = pool.filter((item) => {
        return item.opponentHasNonKillingReply;
      });

      const mainPool =
        mutuallyContinuableMoves.length > 0
          ? mutuallyContinuableMoves
          : pool;

      const selected = pickBestForKeepingAlive(mainPool).wordObj;

      debugLog(context, evaluated, selected, budget);

      return selected;
    }
  };

  function evaluateRootMove(wordObj, context, source, budget) {
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

    if (isImmediateWin) {
      return {
        wordObj,
        isImmediateWin: true,
        opponentCandidateCount: 0,
        opponentTailTypeCount: 0,
        opponentHasNonKillingReply: false,
        opponentKillingReplyCount: 0,
        minMyNextCandidateCount: Infinity,
        averageMyNextCandidateCount: Infinity,
        maxMyNextCandidateCount: Infinity,
        cooperativeDepth: 1
      };
    }

    const replyInfos = opponentCandidates.map((opponentWord) => {
      const usedAfterOpponentWord = new Set(usedAfterMyWord);
      usedAfterOpponentWord.add(opponentWord.word);

      const myNextCandidates = App.rules.getCandidates(
        opponentWord.tail,
        source,
        usedAfterOpponentWord,
        context.settings,
        { excludeN: true }
      );

      return {
        opponentWord,
        myNextCandidateCount: myNextCandidates.length,
        killsMe: myNextCandidates.length === 0,
        usedAfterOpponentWord
      };
    });

    const nonKillingReplies = replyInfos.filter((info) => {
      return !info.killsMe;
    });

    const repliesForDepth =
      nonKillingReplies.length > 0
        ? nonKillingReplies
        : replyInfos;

    const limitedReplies = limitOpponentRepliesForCooperation(
      repliesForDepth,
      source,
      context.settings
    );

    let bestContinuationDepth = 0;

    for (const info of limitedReplies) {
      if (budget.nodes >= budget.maxNodes) {
        budget.wasCutOff = true;
        break;
      }

      const depthAfterReply = cooperativeDepth(
        info.opponentWord.tail,
        source,
        info.usedAfterOpponentWord,
        context.settings,
        MAX_COOPERATIVE_DEPTH - 2,
        budget
      );

      bestContinuationDepth = Math.max(
        bestContinuationDepth,
        depthAfterReply
      );
    }

    const myNextCounts = replyInfos.map((info) => {
      return info.myNextCandidateCount;
    });

    const minMyNextCandidateCount = Math.min(...myNextCounts);

    const averageMyNextCandidateCount =
      myNextCounts.reduce((sum, count) => {
        return sum + count;
      }, 0) / myNextCounts.length;

    const maxMyNextCandidateCount = Math.max(...myNextCounts);

    const opponentKillingReplyCount = replyInfos.filter((info) => {
      return info.killsMe;
    }).length;

    return {
      wordObj,
      isImmediateWin: false,

      opponentCandidateCount: opponentCandidates.length,
      opponentTailTypeCount: countTailTypes(opponentCandidates, context.settings),

      opponentHasNonKillingReply: nonKillingReplies.length > 0,
      opponentKillingReplyCount,

      minMyNextCandidateCount,
      averageMyNextCandidateCount,
      maxMyNextCandidateCount,

      /*
       * 自分の手 + 相手の返し + その後の協調延命深度
       */
      cooperativeDepth: 2 + bestContinuationDepth
    };
  }

  /*
   * 互いに「即殺を避ける手があるなら避ける」と仮定した延命深度。
   * 勝つための探索ではなく、長く続く枝を探す。
   */
  function cooperativeDepth(
    requiredHead,
    source,
    temporaryUsedWords,
    settings,
    remainingDepth,
    budget
  ) {
    if (remainingDepth <= 0) {
      return 0;
    }

    if (budget.nodes >= budget.maxNodes) {
      budget.wasCutOff = true;
      return quickContinuability(requiredHead, source, temporaryUsedWords, settings);
    }

    budget.nodes += 1;

    const candidates = App.rules.getCandidates(
      requiredHead,
      source,
      temporaryUsedWords,
      settings,
      { excludeN: true }
    );

    if (!candidates || candidates.length === 0) {
      return 0;
    }

    const evaluated = candidates.map((wordObj) => {
      const usedAfterWord = new Set(temporaryUsedWords);
      usedAfterWord.add(wordObj.word);

      const nextCandidates = App.rules.getCandidates(
        wordObj.tail,
        source,
        usedAfterWord,
        settings,
        { excludeN: true }
      );

      return {
        wordObj,
        usedAfterWord,
        nextCandidateCount: nextCandidates.length,
        nextTailTypeCount: countTailTypes(nextCandidates, settings),
        isKillingMove: nextCandidates.length === 0
      };
    });

    /*
     * 即殺しない手があるなら、即殺手は避ける。
     */
    const nonKilling = evaluated.filter((item) => {
      return !item.isKillingMove;
    });

    const pool =
      nonKilling.length > 0
        ? nonKilling
        : evaluated;

    const limited = pool
      .slice()
      .sort((a, b) => {
        if (a.nextCandidateCount !== b.nextCandidateCount) {
          return b.nextCandidateCount - a.nextCandidateCount;
        }

        if (a.nextTailTypeCount !== b.nextTailTypeCount) {
          return b.nextTailTypeCount - a.nextTailTypeCount;
        }

        return 0;
      })
      .slice(0, MAX_BRANCHES_PER_NODE);

    let bestDepth = 0;

    for (const item of limited) {
      if (budget.nodes >= budget.maxNodes) {
        budget.wasCutOff = true;
        break;
      }

      if (item.isKillingMove) {
        bestDepth = Math.max(bestDepth, 1);
        continue;
      }

      const depth =
        1 +
        cooperativeDepth(
          item.wordObj.tail,
          source,
          item.usedAfterWord,
          settings,
          remainingDepth - 1,
          budget
        );

      bestDepth = Math.max(bestDepth, depth);
    }

    return bestDepth;
  }

  function quickContinuability(requiredHead, source, temporaryUsedWords, settings) {
    const candidates = App.rules.getCandidates(
      requiredHead,
      source,
      temporaryUsedWords,
      settings,
      { excludeN: true }
    );

    if (!candidates || candidates.length === 0) {
      return 0;
    }

    return 1;
  }

  function limitOpponentRepliesForCooperation(replyInfos, source, settings) {
    return replyInfos
      .slice()
      .sort((a, b) => {
        /*
         * 協調延命なので、自分候補を多く残す返しを優先して見る。
         */
        if (a.myNextCandidateCount !== b.myNextCandidateCount) {
          return b.myNextCandidateCount - a.myNextCandidateCount;
        }

        const aTailTypes = countTailTypes(
          App.rules.getCandidates(
            a.opponentWord.tail,
            source,
            a.usedAfterOpponentWord,
            settings,
            { excludeN: true }
          ),
          settings
        );

        const bTailTypes = countTailTypes(
          App.rules.getCandidates(
            b.opponentWord.tail,
            source,
            b.usedAfterOpponentWord,
            settings,
            { excludeN: true }
          ),
          settings
        );

        return bTailTypes - aTailTypes;
      })
      .slice(0, MAX_BRANCHES_PER_NODE);
  }

  function pickBestForKeepingAlive(items) {
    const best = items.reduce((currentBest, item) => {
      if (!currentBest) return item;

      return compareKeepingAlive(item, currentBest) > 0
        ? item
        : currentBest;
    }, null);

    const tied = items.filter((item) => {
      return isSameKeepingAliveScore(item, best);
    });

    return pickRandom(tied);
  }

  function compareKeepingAlive(a, b) {
    /*
     * 最重要：協調延命した場合に長く続く手。
     */
    if (a.cooperativeDepth !== b.cooperativeDepth) {
      return a.cooperativeDepth - b.cooperativeDepth;
    }

    /*
     * 相手にも選択肢を多く残す。
     */
    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return a.opponentCandidateCount - b.opponentCandidateCount;
    }

    if (a.opponentTailTypeCount !== b.opponentTailTypeCount) {
      return a.opponentTailTypeCount - b.opponentTailTypeCount;
    }

    /*
     * 相手がこちらを殺せる返しは少ない方がよい。
     * ただし、完全排除はしない。
     */
    if (a.opponentKillingReplyCount !== b.opponentKillingReplyCount) {
      return b.opponentKillingReplyCount - a.opponentKillingReplyCount;
    }

    /*
     * 相手の協調的返し後に、自分候補が広い方がよい。
     */
    if (a.maxMyNextCandidateCount !== b.maxMyNextCandidateCount) {
      return a.maxMyNextCandidateCount - b.maxMyNextCandidateCount;
    }

    if (a.averageMyNextCandidateCount !== b.averageMyNextCandidateCount) {
      return a.averageMyNextCandidateCount - b.averageMyNextCandidateCount;
    }

    if (a.minMyNextCandidateCount !== b.minMyNextCandidateCount) {
      return a.minMyNextCandidateCount - b.minMyNextCandidateCount;
    }

    return 0;
  }

  function isSameKeepingAliveScore(a, b) {
    return (
      a.cooperativeDepth === b.cooperativeDepth &&
      a.opponentCandidateCount === b.opponentCandidateCount &&
      a.opponentTailTypeCount === b.opponentTailTypeCount &&
      a.opponentKillingReplyCount === b.opponentKillingReplyCount &&
      a.maxMyNextCandidateCount === b.maxMyNextCandidateCount &&
      a.averageMyNextCandidateCount === b.averageMyNextCandidateCount &&
      a.minMyNextCandidateCount === b.minMyNextCandidateCount
    );
  }

  function countTailTypes(wordObjects, settings) {
    const tailTypes = new Set();

    for (const wordObj of wordObjects || []) {
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

  function debugLog(context, evaluated, selected, budget) {
    if (
      !App.settings ||
      !App.settings.isDebugMode ||
      !App.settings.isDebugMode()
    ) {
      return;
    }

    console.log("[keep_alive_cooperative]", {
      requiredHead: context.requiredHead,
      selected: selected ? selected.word : null,
      budget,
      constants: {
        MAX_COOPERATIVE_DEPTH,
        MAX_BRANCHES_PER_NODE,
        MAX_NODES_PER_MOVE
      },
      evaluated: evaluated.map((item) => ({
        word: item.wordObj.word,
        head: item.wordObj.head,
        tail: item.wordObj.tail,
        isImmediateWin: item.isImmediateWin,
        cooperativeDepth: item.cooperativeDepth,
        opponentCandidateCount: item.opponentCandidateCount,
        opponentTailTypeCount: item.opponentTailTypeCount,
        opponentHasNonKillingReply: item.opponentHasNonKillingReply,
        opponentKillingReplyCount: item.opponentKillingReplyCount,
        minMyNextCandidateCount: item.minMyNextCandidateCount,
        averageMyNextCandidateCount: item.averageMyNextCandidateCount,
        maxMyNextCandidateCount: item.maxMyNextCandidateCount
      }))
    });
  }
})(window.App);

/*
【戦略名】
延命戦略 / keep_alive

【今回の版】
この版は「対戦相手もラリーを続けたい」と仮定する協調延命型。

前回までの版は、
  相手がこちらを殺しにくる可能性
を見すぎて、実際には長いラリーを作りにくかった。

今回は、
  即殺しない手があるなら即殺しない
  相手がこちらを生かせる返しを持つ手を選ぶ
  互いに即殺を避けた場合に長く続く手を選ぶ
という方針にしている。

【向いている用途】
・keep_alive vs keep_alive で長いラリーを見る。
・人間相手に、すぐ勝ちに来ない練習相手を作る。
・単語資源の自然な消費を観察する。

【向いていない用途】
・sniper など、殺しに来る相手への勝率最大化。
・相手の最善手を想定した防御。
・強いAIとして勝ちに行くこと。

【調整値】
MAX_COOPERATIVE_DEPTH:
  延命探索の深さ。
  初期値は8。
  固まるなら6、もっと長くしたいなら10。

MAX_BRANCHES_PER_NODE:
  各局面で見る候補数。
  初期値は8。
  固まるなら5〜6。

MAX_NODES_PER_MOVE:
  1手選択あたりの探索ノード上限。
  初期値は1800。
  固まるなら800〜1200。
*/