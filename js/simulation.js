(function (App) {
  "use strict";

  const SPECIAL_WORD_LUCHABULL = "ルチャブル";

  let refs = {};

  document.addEventListener("DOMContentLoaded", () => {
    refs = {
      strategyASelect: document.getElementById("strategyASelect"),
      strategyBSelect: document.getElementById("strategyBSelect"),
      gameCountInput: document.getElementById("gameCountInput"),
      dakutenModeSelect: document.getElementById("simulationDakutenModeSelect"),
      focusWordInput: document.getElementById("focusWordInput"),
      alternateFirstCheckbox: document.getElementById("alternateFirstCheckbox"),
      showSampleLogsCheckbox: document.getElementById("showSampleLogsCheckbox"),
      runButton: document.getElementById("runSimulationButton"),
      status: document.getElementById("simulationStatus"),

      progress: document.getElementById("simulationProgress"),
      progressText: document.getElementById("simulationProgressText"),

      summaryResults: document.getElementById("summaryResults"),
      detailResults: document.getElementById("detailResults"),
      sampleLogs: document.getElementById("sampleLogs")
    };

    App.rules.buildWordIndex(App.wordlist || []);

    populateStrategySelects();

    refs.runButton.addEventListener("click", runSimulation);
  });

  function populateStrategySelects() {
    const strategies = Object.values(App.strategies || {});

    if (strategies.length === 0) {
      refs.status.textContent =
        "読み込まれている戦略がありません。simulation.html の script タグを確認してください。";
      refs.runButton.disabled = true;
      return;
    }

    for (const strategy of strategies) {
      refs.strategyASelect.appendChild(makeStrategyOption(strategy));
      refs.strategyBSelect.appendChild(makeStrategyOption(strategy));
    }

    if (strategies[0]) {
      refs.strategyASelect.value = strategies[0].id;
    }

    if (strategies[1]) {
      refs.strategyBSelect.value = strategies[1].id;
    } else {
      refs.strategyBSelect.value = strategies[0].id;
    }
  }

  function makeStrategyOption(strategy) {
    const option = document.createElement("option");
    option.value = strategy.id;
    option.textContent = strategy.name || strategy.id;
    return option;
  }

  async function runSimulation() {
    const strategyA = App.strategies[refs.strategyASelect.value];
    const strategyB = App.strategies[refs.strategyBSelect.value];

    if (!strategyA || !strategyB) {
      refs.status.textContent = "戦略の取得に失敗しました。";
      return;
    }

    const gameCount = clampNumber(
      Number(refs.gameCountInput.value),
      1,
      10000000,
      1000
    );

    const focusWordObj = App.rules.findWordByInput(
      refs.focusWordInput.value || "ルチャブル"
    );

    const options = {
      dakutenMode: refs.dakutenModeSelect.value,
      alternateFirst: refs.alternateFirstCheckbox.checked,
      showSampleLogs: refs.showSampleLogsCheckbox.checked,
      focusWord: focusWordObj
        ? focusWordObj.word
        : (refs.focusWordInput.value || "ルチャブル"),
      maxTurns: (App.wordlist || []).length + 5
    };

    refs.status.textContent = "シミュレーション中...";
    refs.runButton.disabled = true;

    const summary = createEmptySummary(strategyA, strategyB, options);
    const sampleResults = [];

    const timeSliceMs = 25;
    const maxStoredHistories = 10;
    let lastYieldTime = performance.now();

    updateProgress(0, gameCount);

    for (let i = 0; i < gameCount; i += 1) {
      const result = playOneGame(strategyA, strategyB, i, options);

      attachCompactStats(result, options);
      addResultToSummary(summary, result);

      if (sampleResults.length < maxStoredHistories) {
        sampleResults.push(result);
      }

      const now = performance.now();
      const isLastGame = i + 1 === gameCount;
      const shouldYield = now - lastYieldTime >= timeSliceMs;

      if (shouldYield || isLastGame) {
        const done = i + 1;

        refs.status.textContent =
          `シミュレーション中... ${done} / ${gameCount} 試合完了`;

        updateProgress(done, gameCount);

        lastYieldTime = performance.now();

        await yieldToBrowser();
      }
    }

    finalizeSummary(summary);

    renderSummary(summary);
    renderDetails(summary);
    renderSampleLogs(sampleResults, options);

    refs.status.textContent =
      `${gameCount} 試合のシミュレーションが完了しました。`;

    updateProgress(gameCount, gameCount);

    refs.runButton.disabled = false;
  }

  function playOneGame(strategyA, strategyB, gameIndex, options) {
    const allWords = App.wordlist || [];
    const settings = {
      dakutenMode: options.dakutenMode
    };

    const initialOptions = App.rules.getInitialHeadOptions(
      allWords,
      settings,
      5
    );

    if (initialOptions.length === 0) {
      return {
        resultType: "initial-failure",
        winnerLabel: null,
        loserLabel: null,
        reason: "initial-failure",
        turns: 0,
        firstLabel: null,
        secondLabel: null,
        initialHeadDisplay: "-",
        history: []
      };
    }

    const initial = pickRandom(initialOptions);

    const players = [
      {
        label: "A",
        strategy: strategyA
      },
      {
        label: "B",
        strategy: strategyB
      }
    ];

    const firstIndex =
      options.alternateFirst && gameIndex % 2 === 1
        ? 1
        : 0;

    let currentIndex = firstIndex;
    let requiredHead = initial.requiredHead;
    const usedWords = new Set();

    const availableIndex = App.rules.createAvailableIndex(
      allWords,
      settings,
      { excludeN: true }
    );

    const history = [];
    let lastMove = null;

    for (let turn = 0; turn < options.maxTurns; turn += 1) {
      const currentPlayer = players[currentIndex];
      const opponentPlayer = players[1 - currentIndex];

      const candidateWords = App.rules.getCandidates(
        requiredHead,
        availableIndex,
        null,
        settings,
        { excludeN: true }
      );

      if (candidateWords.length === 0) {
        return {
          resultType: "win-loss",
          winnerLabel: opponentPlayer.label,
          loserLabel: currentPlayer.label,
          reason: "candidate-none",
          turns: history.length,
          firstLabel: players[firstIndex].label,
          secondLabel: players[1 - firstIndex].label,
          initialHeadDisplay: initial.display,
          losingRequiredHead: requiredHead,
          losingRequiredHeadDisplay: App.rules.displayRequiredHead(
            requiredHead,
            settings
          ),
          lastMove,
          history
        };
      }

      const context = {
        candidateWords,
        usedWords,
        allWords,
        availableIndex,
        requiredHead,
        settings,
        simulation: {
          gameIndex,
          turn,
          currentPlayerLabel: currentPlayer.label,
          history
        }
      };

      const selectedWord = currentPlayer.strategy.selectSystemWord(context);

      if (!selectedWord) {
        return {
          resultType: "win-loss",
          winnerLabel: opponentPlayer.label,
          loserLabel: currentPlayer.label,
          reason: "no-selection",
          turns: history.length,
          firstLabel: players[firstIndex].label,
          secondLabel: players[1 - firstIndex].label,
          initialHeadDisplay: initial.display,
          losingRequiredHead: requiredHead,
          losingRequiredHeadDisplay: App.rules.displayRequiredHead(
            requiredHead,
            settings
          ),
          lastMove,
          history
        };
      }

      const isValidCandidate = candidateWords.some((wordObj) => {
        return wordObj.word === selectedWord.word;
      });

      if (!isValidCandidate) {
        return {
          resultType: "win-loss",
          winnerLabel: opponentPlayer.label,
          loserLabel: currentPlayer.label,
          reason: "invalid-selection",
          turns: history.length,
          firstLabel: players[firstIndex].label,
          secondLabel: players[1 - firstIndex].label,
          initialHeadDisplay: initial.display,
          losingRequiredHead: requiredHead,
          losingRequiredHeadDisplay: App.rules.displayRequiredHead(
            requiredHead,
            settings
          ),
          lastMove,
          invalidWord: selectedWord.word,
          history
        };
      }

      if (App.rules.isEndingN(selectedWord)) {
        return {
          resultType: "win-loss",
          winnerLabel: opponentPlayer.label,
          loserLabel: currentPlayer.label,
          reason: "ending-n",
          turns: history.length + 1,
          firstLabel: players[firstIndex].label,
          secondLabel: players[1 - firstIndex].label,
          initialHeadDisplay: initial.display,
          losingRequiredHead: requiredHead,
          losingRequiredHeadDisplay: App.rules.displayRequiredHead(
            requiredHead,
            settings
          ),
          lastMove,
          history
        };
      }

      const move = {
        turn: history.length + 1,
        playerLabel: currentPlayer.label,
        word: selectedWord.word,
        head: selectedWord.head,
        tail: selectedWord.tail,
        requiredHead,
        requiredHeadDisplay: App.rules.displayRequiredHead(
          requiredHead,
          settings
        )
      };

      history.push(move);
      lastMove = move;

      usedWords.add(selectedWord.word);
      App.rules.removeFromAvailableIndex(availableIndex, selectedWord);

      requiredHead = selectedWord.tail;
      currentIndex = 1 - currentIndex;
    }

    return {
      resultType: "draw",
      winnerLabel: null,
      loserLabel: null,
      reason: "turn-limit",
      turns: history.length,
      firstLabel: players[firstIndex].label,
      secondLabel: players[1 - firstIndex].label,
      initialHeadDisplay: initial.display,
      losingRequiredHead: requiredHead,
      losingRequiredHeadDisplay: App.rules.displayRequiredHead(
        requiredHead,
        settings
      ),
      lastMove,
      history
    };
  }

  function attachCompactStats(result, options) {
    const compact = {
      totalMovesByPlayer: {
        A: 0,
        B: 0
      },
      usedWords: {},
      usedWordsByPlayer: {
        A: {},
        B: {}
      },
      usedTails: {},

      usedTransitions: {},
      usedTransitionsByPlayer: {
        A: {},
        B: {}
      },

      ruPassedCount: 0,
      hasRuPassed: false,
      hasLuchabull: false,
      luchabullUsedCount: 0,
      luchabullUsedByPlayer: {
        A: 0,
        B: 0
      },
      hasFocusWord: false,
      focusWordUsedByPlayer: {
        A: 0,
        B: 0
      }
    };

    for (const move of result.history || []) {
      compact.totalMovesByPlayer[move.playerLabel] += 1;

      increment(compact.usedWords, move.word);
      increment(compact.usedWordsByPlayer[move.playerLabel], move.word);
      increment(compact.usedTails, move.tail);

      const transition = makeTransitionLabel(move.head, move.tail);

      increment(compact.usedTransitions, transition);
      increment(compact.usedTransitionsByPlayer[move.playerLabel], transition);

      if (move.tail === "ル") {
        compact.ruPassedCount += 1;
        compact.hasRuPassed = true;
      }

      if (move.word === SPECIAL_WORD_LUCHABULL) {
        compact.hasLuchabull = true;
        compact.luchabullUsedCount += 1;
        compact.luchabullUsedByPlayer[move.playerLabel] += 1;
      }

      if (move.word === options.focusWord) {
        compact.hasFocusWord = true;
        compact.focusWordUsedByPlayer[move.playerLabel] += 1;
      }
    }

    result.compactStats = compact;
  }

  function createEmptySummary(strategyA, strategyB, options) {
    return {
      strategyA,
      strategyB,
      options,
      totalGames: 0,
      wins: {
        A: 0,
        B: 0
      },
      losses: {
        A: 0,
        B: 0
      },
      draws: 0,
      firstWins: 0,
      secondWins: 0,
      firstGames: 0,
      secondGames: 0,
      byRole: {
        A: {
          firstGames: 0,
          firstWins: 0,
          secondGames: 0,
          secondWins: 0,
          totalMoves: 0
        },
        B: {
          firstGames: 0,
          firstWins: 0,
          secondGames: 0,
          secondWins: 0,
          totalMoves: 0
        }
      },
      totalTurns: 0,
      minTurns: Infinity,
      maxTurns: 0,
      lossReasons: {},
      usedWords: {},
      usedWordsByPlayer: {
        A: {},
        B: {}
      },
      usedTails: {},
      checkmateHeads: {},
      losingRequiredHeads: {},
      initialHeadStats: {},
      winningLastWords: {},

      transitionStats: {
        used: {},
        usedByPlayer: {
          A: {},
          B: {}
        },
        lethal: {},
        lethalByPlayer: {
          A: {},
          B: {}
        }
      },

      lethalStats: {
        byPlayer: {
          A: {
            words: {},
            heads: {}
          },
          B: {
            words: {},
            heads: {}
          }
        }
      },

      focusWordStats: {
        word: options.focusWord,
        gamesWithFocusWord: 0,
        winsAfterFocusWord: {
          A: 0,
          B: 0
        },
        lossesAfterFocusWord: {
          A: 0,
          B: 0
        },
        usedByPlayer: {
          A: 0,
          B: 0
        }
      },
      ruPassStats: {
        gamesWithRuPassed: 0,
        winsAfterRuPassed: {
          A: 0,
          B: 0
        },
        lossesAfterRuPassed: {
          A: 0,
          B: 0
        }
      },
      ruStats: {
        ruPassedCount: 0,
        ruCandidateNoneLossCount: 0,
        luchabullUsedCount: 0,
        luchabullUsedByPlayer: {
          A: 0,
          B: 0
        },
        luchabullDecisiveWinCount: 0,
        luchabullGames: 0,
        luchabullWinner: {
          A: 0,
          B: 0
        },
        luchabullLoser: {
          A: 0,
          B: 0
        }
      }
    };
  }

  function addResultToSummary(summary, result) {
    summary.totalGames += 1;

    if (result.firstLabel) {
      summary.firstGames += 1;

      if (result.secondLabel) {
        summary.secondGames += 1;
      }

      summary.byRole[result.firstLabel].firstGames += 1;
      summary.byRole[result.secondLabel].secondGames += 1;
    }

    if (result.winnerLabel) {
      summary.wins[result.winnerLabel] += 1;
      summary.losses[result.loserLabel] += 1;

      if (result.winnerLabel === result.firstLabel) {
        summary.firstWins += 1;
        summary.byRole[result.winnerLabel].firstWins += 1;
      }

      if (result.winnerLabel === result.secondLabel) {
        summary.secondWins += 1;
        summary.byRole[result.winnerLabel].secondWins += 1;
      }
    } else {
      summary.draws += 1;
    }

    summary.totalTurns += result.turns;
    summary.minTurns = Math.min(summary.minTurns, result.turns);
    summary.maxTurns = Math.max(summary.maxTurns, result.turns);

    increment(summary.lossReasons, reasonLabel(result.reason));

    updateInitialHeadStats(summary, result);

    if (result.reason === "candidate-none") {
      const lethalHead = result.losingRequiredHeadDisplay || "-";

      increment(summary.checkmateHeads, lethalHead);
      increment(summary.losingRequiredHeads, lethalHead);

      if (result.winnerLabel && result.lastMove) {
        const lethalTransition = makeTransitionLabel(
          result.lastMove.head,
          result.lastMove.tail
        );

        increment(
          summary.lethalStats.byPlayer[result.winnerLabel].words,
          result.lastMove.word
        );

        increment(
          summary.lethalStats.byPlayer[result.winnerLabel].heads,
          lethalHead
        );

        increment(summary.transitionStats.lethal, lethalTransition);

        increment(
          summary.transitionStats.lethalByPlayer[result.winnerLabel],
          lethalTransition
        );
      }

      if (isRuGroup(result.losingRequiredHead)) {
        summary.ruStats.ruCandidateNoneLossCount += 1;
      }

      if (
        result.lastMove &&
        result.lastMove.word === SPECIAL_WORD_LUCHABULL
      ) {
        summary.ruStats.luchabullDecisiveWinCount += 1;
      }
    }

    if (result.lastMove && result.winnerLabel) {
      increment(summary.winningLastWords, result.lastMove.word);
    }

    const gameFlags = {
      hasFocusWord: false,
      hasRuPassed: false,
      hasLuchabull: false
    };

    const compact = result.compactStats || {
      totalMovesByPlayer: { A: 0, B: 0 },
      usedWords: {},
      usedWordsByPlayer: { A: {}, B: {} },
      usedTails: {},
      usedTransitions: {},
      usedTransitionsByPlayer: { A: {}, B: {} },
      ruPassedCount: 0,
      hasRuPassed: false,
      hasLuchabull: false,
      luchabullUsedCount: 0,
      luchabullUsedByPlayer: { A: 0, B: 0 },
      hasFocusWord: false,
      focusWordUsedByPlayer: { A: 0, B: 0 }
    };

    summary.byRole.A.totalMoves += compact.totalMovesByPlayer.A;
    summary.byRole.B.totalMoves += compact.totalMovesByPlayer.B;

    mergeCounts(summary.usedWords, compact.usedWords);
    mergeCounts(summary.usedWordsByPlayer.A, compact.usedWordsByPlayer.A);
    mergeCounts(summary.usedWordsByPlayer.B, compact.usedWordsByPlayer.B);
    mergeCounts(summary.usedTails, compact.usedTails);

    mergeCounts(summary.transitionStats.used, compact.usedTransitions);
    mergeCounts(
      summary.transitionStats.usedByPlayer.A,
      compact.usedTransitionsByPlayer.A
    );
    mergeCounts(
      summary.transitionStats.usedByPlayer.B,
      compact.usedTransitionsByPlayer.B
    );

    summary.ruStats.ruPassedCount += compact.ruPassedCount;

    if (compact.hasRuPassed) {
      gameFlags.hasRuPassed = true;
    }

    if (compact.hasLuchabull) {
      gameFlags.hasLuchabull = true;
      summary.ruStats.luchabullUsedCount += compact.luchabullUsedCount;
      summary.ruStats.luchabullUsedByPlayer.A +=
        compact.luchabullUsedByPlayer.A;
      summary.ruStats.luchabullUsedByPlayer.B +=
        compact.luchabullUsedByPlayer.B;
    }

    if (compact.hasFocusWord) {
      gameFlags.hasFocusWord = true;
      summary.focusWordStats.usedByPlayer.A +=
        compact.focusWordUsedByPlayer.A;
      summary.focusWordStats.usedByPlayer.B +=
        compact.focusWordUsedByPlayer.B;
    }

    if (gameFlags.hasRuPassed) {
      summary.ruPassStats.gamesWithRuPassed += 1;

      if (result.winnerLabel) {
        summary.ruPassStats.winsAfterRuPassed[result.winnerLabel] += 1;
        summary.ruPassStats.lossesAfterRuPassed[result.loserLabel] += 1;
      }
    }

    if (gameFlags.hasLuchabull) {
      summary.ruStats.luchabullGames += 1;

      if (result.winnerLabel) {
        summary.ruStats.luchabullWinner[result.winnerLabel] += 1;
        summary.ruStats.luchabullLoser[result.loserLabel] += 1;
      }
    }

    if (gameFlags.hasFocusWord) {
      summary.focusWordStats.gamesWithFocusWord += 1;

      if (result.winnerLabel) {
        summary.focusWordStats.winsAfterFocusWord[result.winnerLabel] += 1;
        summary.focusWordStats.lossesAfterFocusWord[result.loserLabel] += 1;
      }
    }
  }

  function finalizeSummary(summary) {
    if (summary.minTurns === Infinity) {
      summary.minTurns = 0;
    }
  }

  function updateInitialHeadStats(summary, result) {
    const key = result.initialHeadDisplay || "-";

    if (!summary.initialHeadStats[key]) {
      summary.initialHeadStats[key] = {
        games: 0,
        winsA: 0,
        winsB: 0,
        draws: 0,
        totalTurns: 0
      };
    }

    const item = summary.initialHeadStats[key];

    item.games += 1;
    item.totalTurns += result.turns;

    if (result.winnerLabel === "A") {
      item.winsA += 1;
    } else if (result.winnerLabel === "B") {
      item.winsB += 1;
    } else {
      item.draws += 1;
    }
  }

  function renderSummary(summary) {
    const aName = summary.strategyA.name || summary.strategyA.id;
    const bName = summary.strategyB.name || summary.strategyB.id;

    const total = summary.totalGames;
    const decisiveGames = total - summary.draws;

    refs.summaryResults.innerHTML = "";

    const cards = document.createElement("div");
    cards.className = "simulation-cards";

    cards.appendChild(makeCard("総試合数", total));
    cards.appendChild(makeCard(`${aName} 勝利`, summary.wins.A));
    cards.appendChild(makeCard(`${bName} 勝利`, summary.wins.B));
    cards.appendChild(makeCard("引き分け/上限", summary.draws));
    cards.appendChild(
      makeCard(`${aName} 勝率`, percent(summary.wins.A, total))
    );
    cards.appendChild(
      makeCard(`${bName} 勝率`, percent(summary.wins.B, total))
    );
    cards.appendChild(
      makeCard("平均ターン数", average(summary.totalTurns, total).toFixed(2))
    );
    cards.appendChild(makeCard("最短ターン数", summary.minTurns));
    cards.appendChild(makeCard("最長ターン数", summary.maxTurns));
    cards.appendChild(
      makeCard("先攻勝率", percent(summary.firstWins, decisiveGames))
    );
    cards.appendChild(
      makeCard("後攻勝率", percent(summary.secondWins, decisiveGames))
    );

    refs.summaryResults.appendChild(cards);

    const table = makeTable(
      ["戦略", "勝利", "敗北", "勝率", "先攻勝率", "後攻勝率"],
      [
        [
          aName,
          summary.wins.A,
          summary.losses.A,
          percent(summary.wins.A, total),
          percent(
            summary.byRole.A.firstWins,
            summary.byRole.A.firstGames
          ),
          percent(
            summary.byRole.A.secondWins,
            summary.byRole.A.secondGames
          )
        ],
        [
          bName,
          summary.wins.B,
          summary.losses.B,
          percent(summary.wins.B, total),
          percent(
            summary.byRole.B.firstWins,
            summary.byRole.B.firstGames
          ),
          percent(
            summary.byRole.B.secondWins,
            summary.byRole.B.secondGames
          )
        ]
      ]
    );

    refs.summaryResults.appendChild(table);
  }

  function renderDetails(summary) {
    const aName = summary.strategyA.name || summary.strategyA.id;
    const bName = summary.strategyB.name || summary.strategyB.id;

    refs.detailResults.innerHTML = "";

    refs.detailResults.appendChild(makeSectionTitle("敗因別集計"));
    refs.detailResults.appendChild(
      makeMapTable(summary.lossReasons, ["敗因", "回数"])
    );

    refs.detailResults.appendChild(makeSectionTitle("よく使われた単語 Top 20"));
    refs.detailResults.appendChild(
      makeMapTable(topEntries(summary.usedWords, 20), ["単語", "回数"])
    );

    refs.detailResults.appendChild(makeSectionTitle("よく使われた語尾 Top 20"));
    refs.detailResults.appendChild(
      makeMapTable(topEntries(summary.usedTails, 20), ["語尾", "回数"])
    );

    refs.detailResults.appendChild(makeSectionTitle("使用遷移 Top 20"));
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.used, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${aName} の使用遷移 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.usedByPlayer.A, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${bName} の使用遷移 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.usedByPlayer.B, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(makeSectionTitle("詰ませた文字"));
    refs.detailResults.appendChild(
      makeMapTable(summary.checkmateHeads, ["文字", "回数"])
    );

    refs.detailResults.appendChild(
      makeSectionTitle("負ける直前に要求されていた文字")
    );
    refs.detailResults.appendChild(
      makeMapTable(summary.losingRequiredHeads, ["文字", "回数"])
    );

    refs.detailResults.appendChild(makeSectionTitle("初期文字ごとの勝率"));
    refs.detailResults.appendChild(makeInitialHeadTable(summary));

    refs.detailResults.appendChild(
      makeSectionTitle("戦略ごとの平均使用単語数")
    );
    refs.detailResults.appendChild(
      makeTable(
        ["戦略", "平均使用単語数/試合", "総使用単語数"],
        [
          [
            aName,
            average(summary.byRole.A.totalMoves, summary.totalGames).toFixed(2),
            summary.byRole.A.totalMoves
          ],
          [
            bName,
            average(summary.byRole.B.totalMoves, summary.totalGames).toFixed(2),
            summary.byRole.B.totalMoves
          ]
        ]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle("勝った試合で最後に出した単語 Top 20")
    );
    refs.detailResults.appendChild(
      makeMapTable(topEntries(summary.winningLastWords, 20), ["単語", "回数"])
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${aName} のリーサル単語 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.lethalStats.byPlayer.A.words, 20),
        ["単語", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${bName} のリーサル単語 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.lethalStats.byPlayer.B.words, 20),
        ["単語", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${aName} のリーサル文字 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.lethalStats.byPlayer.A.heads, 20),
        ["文字", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${bName} のリーサル文字 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.lethalStats.byPlayer.B.heads, 20),
        ["文字", "回数"]
      )
    );

    refs.detailResults.appendChild(makeSectionTitle("リーサル遷移 Top 20"));
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.lethal, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${aName} のリーサル遷移 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.lethalByPlayer.A, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`${bName} のリーサル遷移 Top 20`)
    );
    refs.detailResults.appendChild(
      makeMapTable(
        topEntries(summary.transitionStats.lethalByPlayer.B, 20),
        ["遷移", "回数"]
      )
    );

    refs.detailResults.appendChild(makeSectionTitle("ルを渡した後の勝敗"));
    refs.detailResults.appendChild(
      makeTable(
        ["項目", "値"],
        [
          ["ルを含む試合数", summary.ruPassStats.gamesWithRuPassed],
          ["ルを含む試合でAが勝利", summary.ruPassStats.winsAfterRuPassed.A],
          ["ルを含む試合でBが勝利", summary.ruPassStats.winsAfterRuPassed.B],
          ["ルを含む試合でAが敗北", summary.ruPassStats.lossesAfterRuPassed.A],
          ["ルを含む試合でBが敗北", summary.ruPassStats.lossesAfterRuPassed.B],
          [
            "ルを含む試合でA勝率",
            percent(
              summary.ruPassStats.winsAfterRuPassed.A,
              summary.ruPassStats.gamesWithRuPassed
            )
          ],
          [
            "ルを含む試合でB勝率",
            percent(
              summary.ruPassStats.winsAfterRuPassed.B,
              summary.ruPassStats.gamesWithRuPassed
            )
          ]
        ]
      )
    );

    refs.detailResults.appendChild(makeSectionTitle("ル・ルチャブル関連"));

    refs.detailResults.appendChild(
      makeTable(
        ["項目", "値"],
        [
          ["ルを渡した総回数", summary.ruStats.ruPassedCount],
          ["ルで候補なし敗北した回数", summary.ruStats.ruCandidateNoneLossCount],
          ["ルチャブル使用回数", summary.ruStats.luchabullUsedCount],
          ["Aのルチャブル使用回数", summary.ruStats.luchabullUsedByPlayer.A],
          ["Bのルチャブル使用回数", summary.ruStats.luchabullUsedByPlayer.B],
          ["ルチャブルが出た試合数", summary.ruStats.luchabullGames],
          ["ルチャブルが出た試合でA勝利", summary.ruStats.luchabullWinner.A],
          ["ルチャブルが出た試合でB勝利", summary.ruStats.luchabullWinner.B],
          ["ルチャブルが直接決着に絡んだ回数", summary.ruStats.luchabullDecisiveWinCount]
        ]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle(`注目単語「${summary.focusWordStats.word}」使用時の勝敗`)
    );

    refs.detailResults.appendChild(
      makeTable(
        ["項目", "値"],
        [
          ["注目単語が出た試合数", summary.focusWordStats.gamesWithFocusWord],
          ["Aの注目単語使用回数", summary.focusWordStats.usedByPlayer.A],
          ["Bの注目単語使用回数", summary.focusWordStats.usedByPlayer.B],
          ["注目単語が出た試合でA勝利", summary.focusWordStats.winsAfterFocusWord.A],
          ["注目単語が出た試合でB勝利", summary.focusWordStats.winsAfterFocusWord.B],
          [
            "注目単語が出た試合でA勝率",
            percent(
              summary.focusWordStats.winsAfterFocusWord.A,
              summary.focusWordStats.gamesWithFocusWord
            )
          ],
          [
            "注目単語が出た試合でB勝率",
            percent(
              summary.focusWordStats.winsAfterFocusWord.B,
              summary.focusWordStats.gamesWithFocusWord
            )
          ]
        ]
      )
    );

    refs.detailResults.appendChild(
      makeSectionTitle("戦略Aがよく使った単語 Top 10")
    );
    refs.detailResults.appendChild(
      makeMapTable(topEntries(summary.usedWordsByPlayer.A, 10), ["単語", "回数"])
    );

    refs.detailResults.appendChild(
      makeSectionTitle("戦略Bがよく使った単語 Top 10")
    );
    refs.detailResults.appendChild(
      makeMapTable(topEntries(summary.usedWordsByPlayer.B, 10), ["単語", "回数"])
    );
  }

  function renderSampleLogs(sampleResults, options) {
    if (!options.showSampleLogs) {
      refs.sampleLogs.textContent = "サンプルログ表示はOFFです。";
      return;
    }

    const text = sampleResults.map((result, index) => {
      const lines = [];

      lines.push(`=== Sample Game ${index + 1} ===`);
      lines.push(`初期文字：${result.initialHeadDisplay}`);
      lines.push(`先攻：${result.firstLabel}`);
      lines.push("");

      for (const move of result.history) {
        lines.push(
          `${String(move.turn).padStart(3, " ")}. ${move.playerLabel}: ${move.word} ` +
          `(${move.requiredHeadDisplay} → ${move.tail})`
        );
      }

      lines.push("");
      lines.push(
        result.winnerLabel
          ? `勝者：${result.winnerLabel} / 敗者：${result.loserLabel} / 理由：${reasonLabel(result.reason)}`
          : `勝者なし / 理由：${reasonLabel(result.reason)}`
      );

      return lines.join("\n");
    }).join("\n\n");

    refs.sampleLogs.textContent = text || "表示できるログがありません。";
  }

  function makeCard(title, value) {
    const card = document.createElement("div");
    card.className = "simulation-card";

    const titleEl = document.createElement("div");
    titleEl.className = "simulation-card-title";
    titleEl.textContent = title;

    const valueEl = document.createElement("div");
    valueEl.className = "simulation-card-value";
    valueEl.textContent = value;

    card.appendChild(titleEl);
    card.appendChild(valueEl);

    return card;
  }

  function makeSectionTitle(text) {
    const title = document.createElement("h3");
    title.textContent = text;
    return title;
  }

  function makeMapTable(mapObj, headers) {
    const entries = Array.isArray(mapObj)
      ? mapObj
      : Object.entries(mapObj).sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
      const p = document.createElement("p");
      p.textContent = "該当データなし";
      return p;
    }

    return makeTable(headers, entries);
  }

  function makeTable(headers, rows) {
    const table = document.createElement("table");
    table.className = "simulation-table";

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    for (const header of headers) {
      const th = document.createElement("th");
      th.textContent = header;
      trHead.appendChild(th);
    }

    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const row of rows) {
      const tr = document.createElement("tr");

      for (const cell of row) {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    return table;
  }

  function makeInitialHeadTable(summary) {
    const rows = Object.entries(summary.initialHeadStats)
      .sort((a, b) => b[1].games - a[1].games)
      .map(([head, item]) => {
        return [
          head,
          item.games,
          item.winsA,
          item.winsB,
          item.draws,
          percent(item.winsA, item.games),
          percent(item.winsB, item.games),
          average(item.totalTurns, item.games).toFixed(2)
        ];
      });

    return makeTable(
      [
        "初期文字",
        "試合数",
        "A勝利",
        "B勝利",
        "引き分け",
        "A勝率",
        "B勝率",
        "平均ターン"
      ],
      rows
    );
  }

  function updateProgress(done, total) {
    if (!refs.progress || !refs.progressText) return;

    const ratio = total > 0 ? done / total : 0;
    const percentValue = Math.floor(ratio * 100);

    refs.progress.value = done;
    refs.progress.max = total;
    refs.progressText.textContent = `${percentValue}%`;
  }

  function yieldToBrowser() {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }

  function pickRandom(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  function clampNumber(value, min, max, fallback) {
    if (!Number.isFinite(value)) return fallback;
    return Math.max(min, Math.min(max, Math.floor(value)));
  }

  function increment(mapObj, key, amount = 1) {
    const safeKey = key || "-";
    mapObj[safeKey] = (mapObj[safeKey] || 0) + amount;
  }

  function mergeCounts(target, source) {
    for (const [key, value] of Object.entries(source || {})) {
      increment(target, key, value);
    }
  }

  function topEntries(mapObj, limit) {
    return Object.entries(mapObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }

  function average(total, count) {
    if (count === 0) return 0;
    return total / count;
  }

  function percent(value, total) {
    if (!total || total <= 0) return "0.0%";
    return `${((value / total) * 100).toFixed(1)}%`;
  }

  function reasonLabel(reason) {
    const labels = {
      "candidate-none": "候補なし",
      "no-selection": "戦略が単語を返さなかった",
      "invalid-selection": "不正な単語を選択",
      "ending-n": "ン終わり",
      "turn-limit": "ターン上限",
      "initial-failure": "初期文字候補なし"
    };

    return labels[reason] || reason || "-";
  }

  function makeTransitionLabel(head, tail) {
    const safeHead = head || "-";
    const safeTail = tail || "-";

    return `${safeHead}⇒${safeTail}`;
  }

  function isRuGroup(requiredHead) {
    if (!requiredHead) return false;

    const settings = {
      dakutenMode: refs.dakutenModeSelect.value
    };

    return App.rules
      .getEquivalentChars(requiredHead, settings)
      .includes("ル");
  }
})(window.App);