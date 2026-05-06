(function (App) {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    App.settings.init();
    App.ui.init();
    App.debug.init();

    const aliasWarnings = App.rules.buildWordIndex(App.wordlist || []);
    const wordlistWarnings = App.rules.checkWordlist(App.wordlist || []);

    App.debug.setWordlistWarnings([
      ...aliasWarnings,
      ...wordlistWarnings
    ]);

    const refs = App.ui.getRefs();

    refs.inputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      App.game.handleUserSubmit(App.ui.getInputValue());
    });

    refs.surrenderButton.addEventListener("click", () => {
      App.game.handleUserSubmit("降参");
    });

    refs.retryButton.addEventListener("click", () => {
      App.game.startNewGame();
    });

    setupStrategySelection();
  });

  function setupStrategySelection() {
    const strategyModal = document.getElementById("strategyModal");
    const strategyList = document.getElementById("strategyList");
    const startButton = document.getElementById("startWithStrategyButton");

    const strategies = Object.values(App.strategies || {});

    if (strategies.length === 0) {
      strategyList.textContent =
        "読み込まれている戦略がありません。index.html の script タグを確認してください。";
      return;
    }

    let selectedStrategyId = strategies[0].id;

    strategyList.innerHTML = "";

    for (const strategy of strategies) {
      const label = document.createElement("label");
      label.className = "strategy-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "strategy";
      radio.value = strategy.id;

      if (strategy.id === selectedStrategyId) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        selectedStrategyId = strategy.id;
        startButton.disabled = false;
      });

      const name = document.createElement("span");
      name.className = "strategy-name";
      name.textContent = strategy.name || strategy.id;

      const description = document.createElement("p");
      description.className = "strategy-description";
      description.textContent = strategy.description || "";

      label.appendChild(radio);
      label.appendChild(name);
      label.appendChild(description);

      strategyList.appendChild(label);
    }

    startButton.disabled = false;

    startButton.addEventListener("click", () => {
      const selectedStrategy = App.strategies[selectedStrategyId];

      if (!selectedStrategy) {
        alert("戦略の選択に失敗しました。");
        return;
      }

      App.strategy = selectedStrategy;

      strategyModal.hidden = true;

      App.ui.appendNotice(
        `対戦戦略：${selectedStrategy.name || selectedStrategy.id}`
      );

      App.game.startNewGame();
    });
  }
})(window.App);