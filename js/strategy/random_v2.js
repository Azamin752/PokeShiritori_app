(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  App.strategies.randomV2 = {
    id: "randomV2",
    name: "決まり手優先ランダム",
    description:
      "候補単語の中に決まり手があれば優先し、なければランダムに1語を選びます。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const checkmateCandidates = candidates.filter((wordObj) => {
        const nextUsedWords = new Set(context.usedWords);
        nextUsedWords.add(wordObj.word);

        const opponentCandidates = App.rules.getCandidates(
          wordObj.tail,
          context.availableIndex || context.allWords,
          nextUsedWords,
          context.settings,
          { excludeN: true }
        );

        return opponentCandidates.length === 0;
      });

      if (checkmateCandidates.length > 0) {
        return pickRandom(checkmateCandidates);
      }

      return pickRandom(candidates);
    }
  };

  function pickRandom(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }
})(window.App);