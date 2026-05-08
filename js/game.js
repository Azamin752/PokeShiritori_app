(function (App) {
  "use strict";

  let state = null;
  let gameCount = 0;

  function getState() {
    return state;
  }

  function startNewGame() {
    gameCount += 1;

    const words = App.wordlist || [];
    const settings = App.settings.getRuleSettingsSnapshot();
    const startMode = getSelectedStartMode();

    state = {
      gameCount,
      settings,
      startMode,
      usedWords: new Set(),
      availableIndex: App.rules.createAvailableIndex(
        words,
        settings,
        { excludeN: true }
      ),
      requiredHead: null,
      isFreeFirstMove: startMode === "userFreeFirst",
      isOver: false
    };

    App.ui.hideResultModal();
    App.ui.setInputEnabled(true);
    App.ui.appendDivider(`--- Game ${gameCount} ---`);

    if (startMode === "userFreeFirst") {
      App.ui.appendSystemMessage(
        "あなたが先手です。任意の単語から始めてください。"
      );

      App.ui.setRequiredHead("自由");

      App.debug.logGameStart({
        settings,
        startMode,
        initialOptions: null,
        selectedInitial: null
      });

      App.debug.updateForState(state);
      App.ui.focusInput();
      return;
    }

    const initialOptions = App.rules.getInitialHeadOptions(
      words,
      settings,
      5
    );

    if (initialOptions.length === 0) {
      endGame(
        "lose",
        "初期文字候補がありません。単語リストまたは設定を確認してください。"
      );
      return;
    }

    const selectedInitial =
      initialOptions[Math.floor(Math.random() * initialOptions.length)];

    state.requiredHead = selectedInitial.requiredHead;

    App.ui.appendSystemMessage(
      `最初の文字は「${selectedInitial.display}」です。`
    );

    if (startMode === "systemFirst") {
      App.ui.appendSystemMessage("システムが先手です。");
    } else {
      App.ui.appendSystemMessage("あなたが先手です。単語を入力してください。");
    }

    updateRequiredHeadDisplay();

    App.debug.logGameStart({
      settings,
      startMode,
      initialOptions,
      selectedInitial
    });

    App.debug.updateForState(state);

    if (startMode === "systemFirst") {
      systemTurn();
    } else {
      App.ui.focusInput();
    }
  }

  function getSelectedStartMode() {
    const checkedRadio = document.querySelector(
      'input[name="startMode"]:checked'
    );

    if (
      checkedRadio &&
      (
        checkedRadio.value === "systemFirst" ||
        checkedRadio.value === "userFirst" ||
        checkedRadio.value === "userFreeFirst"
      )
    ) {
      return checkedRadio.value;
    }

    return "systemFirst";
  }

  function handleUserSubmit(rawInput) {
    if (!state || state.isOver) return;

    const raw = String(rawInput || "");

    if (App.rules.isSurrenderInput(raw)) {
      App.ui.appendUserMessage("降参");
      App.ui.clearInput();

      endGame(
        "lose",
        "あなたが降参したため、システムの勝利です。"
      );
      return;
    }

    const normalizedInput = App.rules.normalizeKey(raw);
    const wordObj = App.rules.findWordByInput(raw);

    if (!wordObj) {
      App.ui.appendSystemMessage(
        "その単語は単語リストに見つかりません。名前や表記を確認してください。"
      );

      App.debug.logUserInput({
        rawInput: raw,
        normalizedInput,
        matchedWord: null,
        result: "retry",
        reason: "not-found"
      });

      return;
    }

    const isFreeFirstMove = Boolean(state.isFreeFirstMove);

    const isHeadValid = isFreeFirstMove
      ? true
      : App.rules.isHeadMatch(
          state.requiredHead,
          wordObj.head,
          state.settings
        );

    if (!isHeadValid) {
      App.ui.appendSystemMessage(
        `次は「${App.rules.displayRequiredHead(
          state.requiredHead,
          state.settings
        )}」から始まる単語を入力してください。`
      );

      App.debug.logUserInput({
        rawInput: raw,
        normalizedInput,
        matchedWord: wordObj.word,
        requiredHead: state.requiredHead,
        wordHead: wordObj.head,
        wordTail: wordObj.tail,
        isHeadValid,
        result: "retry",
        reason: "head-mismatch"
      });

      return;
    }

    const isEndingN = App.rules.isEndingN(wordObj);
    const isUsed = state.usedWords.has(wordObj.word);

    App.debug.logUserInput({
      rawInput: raw,
      normalizedInput,
      matchedWord: wordObj.word,
      requiredHead: state.requiredHead,
      wordHead: wordObj.head,
      wordTail: wordObj.tail,
      isKnownWord: true,
      isHeadValid,
      isUsed,
      isEndingN,
      isSurrender: false,
      isFreeFirstMove
    });

    if (isEndingN) {
      App.ui.appendUserMessage(wordObj.word);
      App.ui.clearInput();

      endGame(
        "lose",
        "「ン」で終わる単語を使用したため、あなたの敗北です。"
      );
      return;
    }

    if (isUsed) {
      App.ui.appendSystemMessage(
        "その単語はすでに使用されています。もう一度入力してください。"
      );

      App.ui.clearInput();

      App.debug.logUserInput({
        rawInput: raw,
        normalizedInput,
        matchedWord: wordObj.word,
        requiredHead: state.requiredHead,
        wordHead: wordObj.head,
        wordTail: wordObj.tail,
        isKnownWord: true,
        isHeadValid,
        isUsed,
        isEndingN,
        isSurrender: false,
        isFreeFirstMove,
        result: "retry",
        reason: "already-used"
      });

      App.ui.focusInput();
      return;
    }

    acceptWord("user", wordObj);
    App.ui.clearInput();

    if (isFreeFirstMove) {
      state.isFreeFirstMove = false;

      App.ui.appendSystemMessage(
        `あなたの初手「${wordObj.word}」から開始しました。`
      );

      updateRequiredHeadDisplay();
    }

    if (!state.isOver) {
      systemTurn();
    }
  }

  function systemTurn() {
    if (!state || state.isOver) return;

    const candidateWords = App.rules.getCandidates(
      state.requiredHead,
      state.availableIndex,
      null,
      state.settings,
      { excludeN: true }
    );

    if (candidateWords.length === 0) {
      endGame(
        "win",
        "システムは降参しました。あなたの勝利です。"
      );
      return;
    }

    const context = {
      candidateWords,
      usedWords: state.usedWords,
      allWords: App.wordlist,
      availableIndex: state.availableIndex,
      requiredHead: state.requiredHead,
      settings: state.settings,
      state
    };

    const selectedWord = App.strategy.selectSystemWord(context);

    App.debug.logSystemTurn({
      requiredHead: state.requiredHead,
      candidateCount: candidateWords.length,
      candidateWords: candidateWords.map((wordObj) => wordObj.word),
      selectedWord: selectedWord ? selectedWord.word : null
    });

    if (!selectedWord || !candidateWords.includes(selectedWord)) {
      endGame(
        "win",
        "システムがルールに違反しました。あなたの勝利です。"
      );
      return;
    }

    if (App.rules.isEndingN(selectedWord)) {
      App.ui.appendSystemMessage(selectedWord.word);

      endGame(
        "win",
        "システムが「ン」で終わる単語を使用しました。あなたの勝利です。"
      );
      return;
    }

    acceptWord("system", selectedWord);
  }

  function acceptWord(player, wordObj) {
    if (player === "user") {
      App.ui.appendUserMessage(wordObj.word);
    } else {
      App.ui.appendSystemMessage(wordObj.word);
    }

    state.usedWords.add(wordObj.word);
    App.rules.removeFromAvailableIndex(state.availableIndex, wordObj);

    state.requiredHead = wordObj.tail;

    updateRequiredHeadDisplay();
    App.debug.updateForState(state);
    App.ui.focusInput();
  }

  function updateRequiredHeadDisplay() {
    if (!state.requiredHead) {
      App.ui.setRequiredHead("自由");
      return;
    }

    App.ui.setRequiredHead(
      App.rules.displayRequiredHead(state.requiredHead, state.settings)
    );
  }

  function endGame(result, message) {
    if (!state) return;

    state.isOver = true;

    App.ui.appendSystemMessage(message);
    App.ui.setInputEnabled(false);

    const title = result === "win" ? "勝利！" : "敗北…";

    App.ui.showResultModal(title, message);
    App.debug.updateForState(state);
  }

  App.game = {
    getState,
    startNewGame,
    handleUserSubmit
  };
})(window.App);