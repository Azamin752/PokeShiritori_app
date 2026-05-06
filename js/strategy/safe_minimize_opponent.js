(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  App.strategies.safeMinimizeOpponent = {
    id: "safeMinimizeOpponent",
    name: "安全監視つき相手候補最小化戦略",
    description:
      "相手に決まり手を渡す手を避けつつ、相手候補手数を最小化します。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const evaluatedCandidates = candidates.map((wordObj) => {
        const nextUsedWords = new Set(context.usedWords);
        nextUsedWords.add(wordObj.word);

        const opponentCandidates = App.rules.getCandidates(
          wordObj.tail,
          context.allWords,
          nextUsedWords,
          context.settings,
          { excludeN: true }
        );

        const givesOpponentCheckmate = opponentCandidates.some((opponentWord) => {
          const usedAfterOpponent = new Set(nextUsedWords);
          usedAfterOpponent.add(opponentWord.word);

          const myNextCandidates = App.rules.getCandidates(
            opponentWord.tail,
            context.allWords,
            usedAfterOpponent,
            context.settings,
            { excludeN: true }
          );

          return myNextCandidates.length === 0;
        });

        return {
          wordObj,
          opponentCandidateCount: opponentCandidates.length,
          givesOpponentCheckmate
        };
      });

      const safeCandidates = evaluatedCandidates.filter((item) => {
        return !item.givesOpponentCheckmate;
      });

      const pool =
        safeCandidates.length > 0
          ? safeCandidates
          : evaluatedCandidates;

      const minOpponentCandidateCount = Math.min(
        ...pool.map((item) => item.opponentCandidateCount)
      );

      const bestCandidates = pool
        .filter((item) => {
          return item.opponentCandidateCount === minOpponentCandidateCount;
        })
        .map((item) => item.wordObj);

      if (App.settings && App.settings.isDebugMode && App.settings.isDebugMode()) {
        console.log("[safe_minimize_opponent]", {
          evaluatedCandidates: evaluatedCandidates.map((item) => ({
            word: item.wordObj.word,
            tail: item.wordObj.tail,
            opponentCandidateCount: item.opponentCandidateCount,
            givesOpponentCheckmate: item.givesOpponentCheckmate
          })),
          safeCandidateCount: safeCandidates.length,
          selectedPool:
            safeCandidates.length > 0 ? "safeCandidates" : "allCandidates",
          minOpponentCandidateCount,
          bestCandidates: bestCandidates.map((wordObj) => wordObj.word)
        });
      }

      return pickRandom(bestCandidates);
    }
  };

  function pickRandom(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }
})(window.App);
//相手候補最小化戦略
//常に，相手の候補手が最も少ない手を選ぶようにする。
//ただし，ルチャブル返しに100%引っかかる問題あり
//したがって，相手の決まり手を常に監視するシステムの導入を検討。

//安全監視つき相手候補最小化戦略
//上記に加え，相手の決まり手が相手番に存在し得る選択を再警戒で避けるアルゴリズム。