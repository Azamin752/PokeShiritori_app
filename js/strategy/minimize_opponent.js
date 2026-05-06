(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  App.strategies.minimizeOpponent = {
    id: "minimizeOpponent",
    name: "相手候補最小化戦略",
    description: "相手の次候補手数が最も少なくなる手を選びます。",

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

        return {
          wordObj,
          opponentCandidateCount: opponentCandidates.length
        };
      });

      const minOpponentCandidateCount = Math.min(
        ...evaluatedCandidates.map((item) => item.opponentCandidateCount)
      );

      const bestCandidates = evaluatedCandidates
        .filter((item) => {
          return item.opponentCandidateCount === minOpponentCandidateCount;
        })
        .map((item) => item.wordObj);

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