(function (App) {
  "use strict";

  App.strategies = App.strategies || {};

  App.strategies.random = {
    id: "random",
    name: "完全ランダム戦略",
    description: "候補単語の中からランダムに1語を選びます。",

    selectSystemWord(context) {
      const candidates = context.candidateWords;

      if (!candidates || candidates.length === 0) {
        return null;
      }

      const index = Math.floor(Math.random() * candidates.length);
      return candidates[index];
    }
  };
})(window.App);