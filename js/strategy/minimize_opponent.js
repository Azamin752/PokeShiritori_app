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
          context.availableIndex || context.allWords,
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