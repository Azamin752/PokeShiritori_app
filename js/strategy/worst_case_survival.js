(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  App.strategies.worstCaseSurvival = {
    id: "worstCaseSurvival",
    name: "最悪ケース生存戦略",
    description:
      "相手が最も嫌な返しをしてきた場合でも、自分の次候補手が最大限残る手を選びます。",

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

      const bestScore = evaluatedCandidates.reduce((best, current) => {
        if (!best) return current;

        return compareEvaluation(current, best) > 0
          ? current
          : best;
      }, null);

      const bestCandidates = evaluatedCandidates
        .filter((item) => {
          return isSameEvaluationScore(item, bestScore);
        })
        .map((item) => item.wordObj);

      const selected = pickRandom(bestCandidates);

      debugLog(context, evaluatedCandidates, selected, "worst-case-survival");

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
        opponentCandidateCount: 0,
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

    return {
      wordObj,
      isImmediateWin: false,
      opponentCandidateCount: opponentCandidates.length,
      myNextCandidateCounts,
      minMyNextCandidateCount,
      averageMyNextCandidateCount,
      dangerReplyCount
    };
  }

  function compareEvaluation(a, b) {
    if (a.minMyNextCandidateCount !== b.minMyNextCandidateCount) {
      return a.minMyNextCandidateCount - b.minMyNextCandidateCount;
    }

    if (a.dangerReplyCount !== b.dangerReplyCount) {
      return b.dangerReplyCount - a.dangerReplyCount;
    }

    if (a.averageMyNextCandidateCount !== b.averageMyNextCandidateCount) {
      return a.averageMyNextCandidateCount - b.averageMyNextCandidateCount;
    }

    if (a.opponentCandidateCount !== b.opponentCandidateCount) {
      return b.opponentCandidateCount - a.opponentCandidateCount;
    }

    return 0;
  }

  function isSameEvaluationScore(a, b) {
    return (
      a.minMyNextCandidateCount === b.minMyNextCandidateCount &&
      a.dangerReplyCount === b.dangerReplyCount &&
      a.averageMyNextCandidateCount === b.averageMyNextCandidateCount &&
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

    console.log("[worst_case_survival]", {
      requiredHead: context.requiredHead,
      reason,
      selected: selected ? selected.word : null,
      evaluatedCandidates: evaluatedCandidates.map((item) => ({
        word: item.wordObj.word,
        tail: item.wordObj.tail,
        isImmediateWin: item.isImmediateWin,
        opponentCandidateCount: item.opponentCandidateCount,
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
最悪ケース生存戦略 / worst_case_survival

【基本思想】
この戦略は、自分がある単語を出したあと、相手がこちらにとって最も嫌な返しをしてくると仮定する。
そのうえで、次の自分の手番に残る候補手数ができるだけ多くなる単語を選ぶ。

つまり、
  「相手候補を最小化する」
のではなく、
  「相手に返された後でも、自分の選択肢が最も広く残る」
ことを重視する。

【評価手順】
1. 自分の候補単語 wordObj を1つ仮に出す。
2. その語尾 wordObj.tail から、相手が出せる候補単語をすべて調べる。
3. 相手候補が0なら、その単語は即勝ち手なので最優先する。
4. 相手候補がある場合、それぞれの相手候補について、
   その返しを受けた後の自分の次候補手数を数える。
5. その分布のうち、最小値を最重要評価値とする。
   例：
     Aを出した場合 → 自分の次候補数 [0, 5, 8] なら最悪ケースは0
     Bを出した場合 → 自分の次候補数 [3, 4, 6] なら最悪ケースは3
   この場合、Bの方が安全と判断する。

【優先順位】
この戦略の選択優先順位は以下の通り。

1. 相手候補が0になる即勝ち手を最優先
2. 相手の最善返し後に残る自分候補数の最小値が大きい手を優先
3. 同じ最小値なら、自分候補0になる危険返しが少ない手を優先
4. それも同じなら、相手返し後の自分候補数の平均が大きい手を優先
5. それも同じなら、相手候補数が少ない手を優先
6. 完全同点ならランダム

【強み】
・相手が強い戦略であるほど有効になりやすい。
・相手がこちらを詰ませる返しを選んでくる前提で動くため、防御的に堅い。
・safe_minimize_opponent の「相手に決まり手を渡さない」という考えをより一般化している。
・0手詰みだけでなく、「次の自分候補が1個しかない」「2個しかない」といった細い局面も避けやすい。
・ルチャブルのような反撃札を温存される状況にも、単純なル攻めよりは慎重に振る舞う。

【弱み】
・攻撃性はやや低い。
・相手候補を減らすこと自体は主目的ではないため、詰ませる速度は遅くなることがある。
・相手がランダム戦略の場合、最悪ケースを重く見すぎて、平均的には強い手を逃す可能性がある。
・計算量は重め。各自分候補ごとに、相手候補と、その返し後の自分候補を調べるため。
・候補が多い局面では safe_minimize_opponent と同程度か、それ以上に重くなる場合がある。

【仮想敵】
この戦略が想定している相手は、
  「相手はこちらにとって最も嫌な返しを選んでくる」
というタイプ。

具体的には、
・minimize_opponent
・safe_minimize_opponent
・決まり手優先ランダム
・将来的なミニマックス系戦略
などに対して相性を見たい。

逆に、完全ランダム相手には、平均自由度最大化戦略の方が勝率が高くなる可能性がある。

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

したがって、この戦略は攻撃型ではなく、防御・生存型の戦略である。
*/