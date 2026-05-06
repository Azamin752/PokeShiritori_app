(function (App) {
  "use strict";

  let refs = {};

  function init() {
    refs.settingsButton = document.getElementById("settingsButton");
    refs.settingsPanel = document.getElementById("settingsPanel");
    refs.dakutenModeSelect = document.getElementById("dakutenModeSelect");
    refs.debugModeCheckbox = document.getElementById("debugModeCheckbox");

    refs.settingsButton.addEventListener("click", togglePanel);

    refs.debugModeCheckbox.addEventListener("change", () => {
      if (App.debug) {
        App.debug.updateForState(App.game ? App.game.getState() : null);
      }
    });
  }

  function togglePanel() {
    refs.settingsPanel.hidden = !refs.settingsPanel.hidden;
  }

  function getRuleSettingsSnapshot() {
    return {
      dakutenMode: refs.dakutenModeSelect.value
    };
  }

  function isDebugMode() {
    return Boolean(refs.debugModeCheckbox && refs.debugModeCheckbox.checked);
  }

  App.settings = {
    init,
    getRuleSettingsSnapshot,
    isDebugMode
  };
})(window.App);