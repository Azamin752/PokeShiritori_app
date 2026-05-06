(function (App) {
  "use strict";

  let wordMap = new Map();
  let aliasWarnings = [];

  const SMALL_KANA = new Set([
    "ァ", "ィ", "ゥ", "ェ", "ォ",
    "ャ", "ュ", "ョ", "ッ", "ヮ"
  ]);

  const DAKUTEN_GROUPS = [
    ["ウ", "ヴ"],
    ["カ", "ガ"],
    ["キ", "ギ"],
    ["ク", "グ"],
    ["ケ", "ゲ"],
    ["コ", "ゴ"],

    ["サ", "ザ"],
    ["シ", "ジ"],
    ["ス", "ズ"],
    ["セ", "ゼ"],
    ["ソ", "ゾ"],

    ["タ", "ダ"],
    ["チ", "ヂ"],
    ["ツ", "ヅ"],
    ["テ", "デ"],
    ["ト", "ド"],

    ["ハ", "バ", "パ"],
    ["ヒ", "ビ", "ピ"],
    ["フ", "ブ", "プ"],
    ["ヘ", "ベ", "ペ"],
    ["ホ", "ボ", "ポ"]
  ];

  function toKatakana(value) {
    return String(value).replace(/[\u3041-\u3096]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) + 0x60);
    });
  }

  function normalizeKey(value) {
    return toKatakana(String(value || ""))
      .trim()
      .normalize("NFKC")
      .toUpperCase()
      .replace(/:/g, "");
  }

  function normalizeChar(value) {
    return toKatakana(String(value || ""))
      .trim()
      .normalize("NFKC")
      .toUpperCase();
  }

  function makeAliasKeys(word) {
    const base = normalizeKey(word);
    const keys = new Set();

    keys.add(base);

    keys.add(
      base
        .replace(/♀/g, "メス")
        .replace(/♂/g, "オス")
        .replace(/2/g, "ツー")
        .replace(/Z/g, "ゼット")
    );

    return [...keys];
  }

  function buildWordIndex(words) {
    wordMap = new Map();
    aliasWarnings = [];

    for (const wordObj of words) {
      for (const key of makeAliasKeys(wordObj.word)) {
        const existing = wordMap.get(key);

        if (existing && existing.word !== wordObj.word) {
          aliasWarnings.push({
            type: "alias-conflict",
            key,
            words: [existing.word, wordObj.word]
          });
          continue;
        }

        wordMap.set(key, wordObj);
      }
    }

    return aliasWarnings;
  }

  function findWordByInput(input) {
    const key = normalizeKey(input);
    return wordMap.get(key) || null;
  }

  function isSurrenderInput(input) {
    return String(input || "").includes("降参");
  }

  function isEndingN(wordObj) {
    return normalizeChar(wordObj.tail) === "ン";
  }

  function getEquivalentChars(char, settings) {
    const normalized = normalizeChar(char);

    if (!settings || settings.dakutenMode !== "loose") {
      return [normalized];
    }

    for (const group of DAKUTEN_GROUPS) {
      if (group.includes(normalized)) {
        return group;
      }
    }

    return [normalized];
  }

  function isHeadMatch(requiredHead, actualHead, settings) {
    const acceptable = getEquivalentChars(requiredHead, settings);
    const actual = normalizeChar(actualHead);

    return acceptable.includes(actual);
  }

  function displayRequiredHead(requiredHead, settings) {
    return getEquivalentChars(requiredHead, settings).join("/");
  }

  function makeHeadGroupKey(head, settings) {
    return getEquivalentChars(head, settings).join("|");
  }

  function getCandidates(requiredHead, words, usedWords, settings, options = {}) {
    const excludeN = options.excludeN !== false;

    return words.filter((wordObj) => {
      if (usedWords.has(wordObj.word)) return false;
      if (excludeN && isEndingN(wordObj)) return false;
      return isHeadMatch(requiredHead, wordObj.head, settings);
    });
  }

  function getInitialHeadOptions(words, settings, minCount) {
    const groups = new Map();

    for (const wordObj of words) {
      if (isEndingN(wordObj)) continue;

      const groupKey = makeHeadGroupKey(wordObj.head, settings);
      const chars = getEquivalentChars(wordObj.head, settings);

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          key: groupKey,
          requiredHead: chars[0],
          display: chars.join("/"),
          words: []
        });
      }

      groups.get(groupKey).words.push(wordObj);
    }

    return [...groups.values()].filter((group) => {
      return group.words.length >= minCount;
    });
  }

  function analyzeCandidates(requiredHead, usedWords, settings) {
    const words = App.wordlist || [];
    const candidates = getCandidates(requiredHead, words, usedWords, settings, {
      excludeN: true
    });

    return candidates.map((wordObj) => {
      const nextUsed = new Set(usedWords);
      nextUsed.add(wordObj.word);

      const opponentCandidates = getCandidates(
        wordObj.tail,
        words,
        nextUsed,
        settings,
        { excludeN: true }
      );

      return {
        wordObj,
        nextRequiredHead: wordObj.tail,
        opponentCandidateCount: opponentCandidates.length,
        isCheckmate: opponentCandidates.length === 0
      };
    });
  }

  function checkWordlist(words) {
    const warnings = [];
    const seenWords = new Set();

    for (const wordObj of words) {
      if (!wordObj.word) {
        warnings.push({
          type: "missing-word",
          wordObj
        });
      }

      if (!wordObj.head) {
        warnings.push({
          type: "missing-head",
          word: wordObj.word
        });
      }

      if (!wordObj.tail) {
        warnings.push({
          type: "missing-tail",
          word: wordObj.word
        });
      }

      if (seenWords.has(wordObj.word)) {
        warnings.push({
          type: "duplicate-word",
          word: wordObj.word
        });
      }

      seenWords.add(wordObj.word);

      checkHeadTailValue(warnings, wordObj, "head");
      checkHeadTailValue(warnings, wordObj, "tail");
    }

    return warnings;
  }

  function checkHeadTailValue(warnings, wordObj, key) {
    const value = normalizeChar(wordObj[key]);

    if (value.length !== 1) {
      warnings.push({
        type: "invalid-head-tail-length",
        word: wordObj.word,
        key,
        value: wordObj[key]
      });
      return;
    }

    if (!/^[ァ-ヶ]$/.test(value)) {
      warnings.push({
        type: "unexpected-head-tail-char",
        word: wordObj.word,
        key,
        value: wordObj[key]
      });
      return;
    }

    if (SMALL_KANA.has(value)) {
      warnings.push({
        type: "small-kana-head-tail",
        word: wordObj.word,
        key,
        value: wordObj[key]
      });
    }
  }

  App.rules = {
    normalizeKey,
    normalizeChar,
    buildWordIndex,
    findWordByInput,
    isSurrenderInput,
    isEndingN,
    getEquivalentChars,
    isHeadMatch,
    displayRequiredHead,
    getCandidates,
    getInitialHeadOptions,
    analyzeCandidates,
    checkWordlist
  };
})(window.App);