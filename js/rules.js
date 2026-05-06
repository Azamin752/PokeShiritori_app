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

  /*
   * availableIndex
   *
   * 「残り安全単語」を頭文字グループごとに持つ索引。
   * ここに入るのは、原則として「ンで終わらない単語」だけ。
   * 実際に単語が使われたら removeFromAvailableIndex() で削除する。
   */
  function createAvailableIndex(words, settings, options = {}) {
    const excludeN = options.excludeN !== false;

    const index = {
      type: "available-index",
      settings,
      excludeN,
      byHeadKey: new Map(),
      wordToHeadKey: new Map(),
      wordMap: new Map()
    };

    for (const wordObj of words || []) {
      if (excludeN && isEndingN(wordObj)) {
        continue;
      }

      const headKey = makeHeadGroupKey(wordObj.head, settings);

      if (!index.byHeadKey.has(headKey)) {
        index.byHeadKey.set(headKey, new Map());
      }

      index.byHeadKey.get(headKey).set(wordObj.word, wordObj);
      index.wordToHeadKey.set(wordObj.word, headKey);
      index.wordMap.set(wordObj.word, wordObj);
    }

    return index;
  }

  function isAvailableIndex(value) {
    return Boolean(value && value.type === "available-index");
  }

  function getCandidatesFromIndex(
    requiredHead,
    availableIndex,
    settings,
    temporaryUsedWords
  ) {
    const headKey = makeHeadGroupKey(requiredHead, settings);
    const bucket = availableIndex.byHeadKey.get(headKey);

    if (!bucket) {
      return [];
    }

    const candidates = [];

    for (const wordObj of bucket.values()) {
      if (temporaryUsedWords && temporaryUsedWords.has(wordObj.word)) {
        continue;
      }

      candidates.push(wordObj);
    }

    return candidates;
  }

  function removeFromAvailableIndex(availableIndex, wordObj) {
    if (!availableIndex || !wordObj) {
      return;
    }

    const headKey = availableIndex.wordToHeadKey.get(wordObj.word);

    if (!headKey) {
      return;
    }

    const bucket = availableIndex.byHeadKey.get(headKey);

    if (bucket) {
      bucket.delete(wordObj.word);
    }

    availableIndex.wordToHeadKey.delete(wordObj.word);
    availableIndex.wordMap.delete(wordObj.word);
  }

  /*
   * 互換用 getCandidates()
   *
   * 第2引数に通常の単語配列を渡した場合：
   *   従来通り、配列を filter する。
   *
   * 第2引数に availableIndex を渡した場合：
   *   頭文字ごとの残り安全単語リストから候補を取得する。
   *
   * 第3引数 usedWords は、availableIndex 使用時には
   * 「仮想的に除外する単語Set」として使う。
   */
  function getCandidates(requiredHead, wordsOrIndex, usedWords, settings, options = {}) {
    if (isAvailableIndex(wordsOrIndex)) {
      return getCandidatesFromIndex(
        requiredHead,
        wordsOrIndex,
        settings,
        usedWords
      );
    }

    const words = wordsOrIndex || [];
    const excludeN = options.excludeN !== false;

    return words.filter((wordObj) => {
      if (usedWords && usedWords.has(wordObj.word)) return false;
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

  function analyzeCandidates(requiredHead, usedWords, settings, availableIndex) {
    const source = availableIndex || App.wordlist || [];

    const candidates = getCandidates(
      requiredHead,
      source,
      usedWords,
      settings,
      { excludeN: true }
    );

    return candidates.map((wordObj) => {
      const nextUsed = new Set(usedWords || []);
      nextUsed.add(wordObj.word);

      const opponentCandidates = getCandidates(
        wordObj.tail,
        source,
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
    createAvailableIndex,
    getCandidatesFromIndex,
    removeFromAvailableIndex,
    isAvailableIndex,

    getInitialHeadOptions,
    analyzeCandidates,
    checkWordlist
  };
})(window.App);