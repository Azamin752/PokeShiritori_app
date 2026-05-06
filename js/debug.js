(function (App) {
  "use strict";

  let wordlistWarnings = [];

  function init() {
    updateForState(null);
  }

  function isEnabled() {
    return App.settings && App.settings.isDebugMode();
  }

  function setWordlistWarnings(warnings) {
    wordlistWarnings = warnings || [];

    if (wordlistWarnings.length > 0) {
      console.warn("[WORDLIST CHECK]", wordlistWarnings);
    }
  }

  function updateForState(state) {
    const enabled = isEnabled();
    App.ui.setDebugPanelVisible(enabled);

    if (!enabled) return;

    renderWarnings();
    renderState(state);
  }

  function renderWarnings() {
    if (wordlistWarnings.length === 0) {
      App.ui.setDebugWarnings("単語リスト警告：なし");
      return;
    }

    App.ui.setDebugWarnings(
      `単語リスト警告：${wordlistWarnings.length}件あります。詳細はコンソールを確認してください。`
    );
  }

  function renderState(state) {
    const root = document.createElement("div");

    if (!state) {
      root.textContent = "ゲーム状態：未開始";
      App.ui.setDebugInfoNode(root);
      return;
    }

    const settings = document.createElement("p");
    settings.innerHTML =
      `現在適用中の設定：<code>${state.settings.dakutenMode}</code>`;
    root.appendChild(settings);

    const required = document.createElement("p");
    required.innerHTML =
      `現在必要な文字：<code>${App.rules.displayRequiredHead(
        state.requiredHead,
        state.settings
      )}</code>`;
    root.appendChild(required);

    const analyses = App.rules.analyzeCandidates(
      state.requiredHead,
      state.usedWords,
      state.settings
    );

    const count = document.createElement("p");
    count.textContent = `候補数：${analyses.length}`;
    root.appendChild(count);

    const list = document.createElement("ul");

    for (const item of analyses) {
      const li = document.createElement("li");

      const mark = item.isCheckmate ? " ★決まり手" : "";

      li.innerHTML =
        `<code>${item.wordObj.word}</code>` +
        ` → tail: <code>${item.wordObj.tail}</code>` +
        ` / 相手候補数: ${item.opponentCandidateCount}` +
        `<span class="${item.isCheckmate ? "checkmate" : ""}">${mark}</span>`;

      list.appendChild(li);
    }

    root.appendChild(list);
    App.ui.setDebugInfoNode(root);
  }

  function logGameStart(info) {
    if (!isEnabled()) return;
    console.log("[GAME START]", info);
  }

  function logUserInput(info) {
    if (!isEnabled()) return;
    console.log("[USER INPUT]", info);
  }

  function logSystemTurn(info) {
    if (!isEnabled()) return;
    console.log("[SYSTEM TURN]", info);
  }

  App.debug = {
    init,
    setWordlistWarnings,
    updateForState,
    logGameStart,
    logUserInput,
    logSystemTurn
  };
})(window.App);