(function (App) {
  "use strict";

  let refs = {};

  function init() {
    refs.chatLog = document.getElementById("chatLog");
    refs.requiredHeadLabel = document.getElementById("requiredHeadLabel");
    refs.inputForm = document.getElementById("inputForm");
    refs.wordInput = document.getElementById("wordInput");
    refs.sendButton = document.getElementById("sendButton");
    refs.surrenderButton = document.getElementById("surrenderButton");
    refs.resultModal = document.getElementById("resultModal");
    refs.resultTitle = document.getElementById("resultTitle");
    refs.resultMessage = document.getElementById("resultMessage");
    refs.retryButton = document.getElementById("retryButton");
    refs.debugPanel = document.getElementById("debugPanel");
    refs.debugWarnings = document.getElementById("debugWarnings");
    refs.debugInfo = document.getElementById("debugInfo");
  }

  function appendMessage(role, speaker, text) {
    const row = document.createElement("div");
    row.className = `chat-row ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = speaker ? `${speaker}：${text}` : text;

    row.appendChild(bubble);
    refs.chatLog.appendChild(row);
    scrollChatToBottom();
  }

  function appendUserMessage(text) {
    appendMessage("user", "ユーザー", text);
  }

  function appendSystemMessage(text) {
    appendMessage("system", "システム", text);
  }

  function appendNotice(text) {
    appendMessage("notice", "", text);
  }

  function appendDivider(text) {
    const divider = document.createElement("div");
    divider.className = "game-divider";
    divider.textContent = text;

    refs.chatLog.appendChild(divider);
    scrollChatToBottom();
  }

  function scrollChatToBottom() {
    refs.chatLog.scrollTop = refs.chatLog.scrollHeight;
  }

  function setRequiredHead(text) {
    refs.requiredHeadLabel.textContent = `次の文字：${text}`;
  }

  function getInputValue() {
    return refs.wordInput.value;
  }

  function clearInput() {
    refs.wordInput.value = "";
  }

  function focusInput() {
    refs.wordInput.focus();
  }

  function setInputEnabled(enabled) {
    refs.wordInput.disabled = !enabled;
    refs.sendButton.disabled = !enabled;
    refs.surrenderButton.disabled = !enabled;
  }

  function showResultModal(title, message) {
    refs.resultTitle.textContent = title;
    refs.resultMessage.textContent = message || "";
    refs.resultModal.hidden = false;
  }

  function hideResultModal() {
    refs.resultModal.hidden = true;
  }

  function setDebugPanelVisible(visible) {
    refs.debugPanel.hidden = !visible;
  }

  function setDebugWarnings(text) {
    refs.debugWarnings.textContent = text;
  }

  function setDebugInfoNode(node) {
    refs.debugInfo.innerHTML = "";
    refs.debugInfo.appendChild(node);
  }

  function getRefs() {
    return refs;
  }

  App.ui = {
    init,
    appendUserMessage,
    appendSystemMessage,
    appendNotice,
    appendDivider,
    setRequiredHead,
    getInputValue,
    clearInput,
    focusInput,
    setInputEnabled,
    showResultModal,
    hideResultModal,
    setDebugPanelVisible,
    setDebugWarnings,
    setDebugInfoNode,
    getRefs
  };
})(window.App);