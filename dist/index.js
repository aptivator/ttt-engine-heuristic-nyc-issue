(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ttt-engine-heuristic"] = {}));
})(this, (function (exports) { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function pickRandomElement(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  var CENTER = 4;
  var moves = {
    corners: [0, 2, 6, 8],
    sides: [1, 3, 5, 7],
    center: [CENTER]
  };
  var opponent = {
    'x': 'o',
    'o': 'x'
  };
  var oppositeCorners = {
    0: 8,
    2: 6,
    6: 2,
    8: 0
  };
  var wins = [{
    cells: [0, 1, 2],
    sideWin: true
  }, {
    cells: [0, 3, 6],
    sideWin: true
  }, {
    cells: [0, 4, 8]
  }, {
    cells: [1, 4, 7]
  }, {
    cells: [2, 5, 8],
    sideWin: true
  }, {
    cells: [2, 4, 6]
  }, {
    cells: [3, 4, 5]
  }, {
    cells: [6, 7, 8],
    sideWin: true
  }];

  function findMoveByType(board, ch, moveType, random) {
    var preferSideWins = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var typeMoves = moves[moveType];
    typeMoves = typeMoves.filter(function (cell) {
      return !board[cell];
    });
    if (typeMoves.length) {
      (function () {
        var potentialWins = getPotentialWins(board, ch, 1);
        var sidePotentialWins = potentialWins.filter(function (potentialWin) {
          return potentialWin.sideWin;
        });
        var nonSidePotentialWins = potentialWins.filter(function (potentialWin) {
          return !potentialWin.sideWin;
        });
        var movesInOnes = new Set();
        for (var _i = 0, _arr = [sidePotentialWins, nonSidePotentialWins]; _i < _arr.length; _i++) {
          var _potentialWins = _arr[_i];
          _potentialWins.forEach(function (potentialWin) {
            var _iterator = _createForOfIteratorHelper(typeMoves),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var cell = _step.value;
                if (potentialWin.blanks.includes(cell)) {
                  movesInOnes.add(cell);
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          });
          if (movesInOnes.size && preferSideWins) {
            break;
          }
        }
        if (movesInOnes.size) {
          typeMoves = Array.from(movesInOnes);
        }
      })();
    }
    return random ? pickRandomElement(typeMoves) : typeMoves[0];
  }
  function getBlankIndices(board) {
    for (var i = 0, blanks = [], length = board.length; i < length; i++) {
      if (!board[i]) {
        blanks.push(i);
      }
    }
    return blanks;
  }
  function getIntersectionsOfPotentialWins(board, ch) {
    var potentialWins = getPotentialWins(board, ch, 1);
    var cellCounts = potentialWins.reduce(function (cellCounts, _ref) {
      var blanks = _ref.blanks;
      var _iterator2 = _createForOfIteratorHelper(blanks),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _cellCounts$blank;
          var blank = _step2.value;
          (_cellCounts$blank = cellCounts[blank]) !== null && _cellCounts$blank !== void 0 ? _cellCounts$blank : cellCounts[blank] = 0;
          cellCounts[blank]++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return cellCounts;
    }, {});
    return Object.entries(cellCounts).reduce(function (intersections, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        blankIndex = _ref3[0],
        cellCount = _ref3[1];
      if (cellCount > 1) {
        intersections.push(+blankIndex);
      }
      return intersections;
    }, []);
  }
  function getPotentialWins(board, ch, requiredNumberOfOccupiedCells) {
    winsLoop: for (var i = 0, potentialWins = []; i < wins.length; i++) {
      var _wins$i = wins[i],
        cells = _wins$i.cells,
        sideWin = _wins$i.sideWin;
      for (var j = 0, numberOfOccupiedCells = 0, blanks = [], taken = []; j < cells.length; j++) {
        var cell = cells[j];
        var _ch = board[cell];
        if (_ch === ch) {
          numberOfOccupiedCells++;
          taken.push(cell);
          continue;
        }
        if (_ch) {
          continue winsLoop;
        }
        blanks.push(cell);
      }
      if (numberOfOccupiedCells === requiredNumberOfOccupiedCells) {
        potentialWins.push({
          cells: cells.slice(),
          blanks: blanks,
          taken: taken,
          sideWin: sideWin
        });
      }
    }
    return potentialWins;
  }
  function normalizeBoard(board) {
    if (typeof board === 'string') {
      board = board.split('').map(function (ch) {
        return ch === ' ' ? null : ch;
      });
    }
    return board;
  }

  var levelToPlayActionsMap = {};

  function getPlayActions() {
    var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    level = level < 0 ? 0 : level > 10 ? 10 : level;
    var playActions = levelToPlayActionsMap[level];
    if (!playActions) {
      levelToPlayActionsMap[level] = playActions = [{
        playAction: checkForWin
      }, {
        playAction: checkForDraw
      }, {
        playAction: determineWinningMove
      }, {
        playAction: determineWinningMove,
        playAsOpponent: true
      }, {
        playAction: findFork
      }, {
        playAction: blockForks,
        playAsOpponent: true
      }, {
        playAction: playCenter
      }, {
        playAction: playOppositeCorner
      }, {
        playAction: playCorner
      }, {
        playAction: playSide
      }];
      playActions.splice(level, 0, {
        playAction: pickRandomMove
      });
      playActions.forEach(function (_ref, index) {
        var playAction = _ref.playAction,
          playAsOpponent = _ref.playAsOpponent;
        playActions[index] = function (board, ch, random) {
          var _move;
          var _ch = playAsOpponent ? opponent[ch] : ch;
          board = board.slice();
          var move = playAction(board, _ch, random);
          if (((_move = move) === null || _move === void 0 ? void 0 : _move.constructor) === Object) {
            return Object.assign(move, {
              ch: ch
            });
          }
          if (typeof move === 'number') {
            board[move] = ch;
            move = {
              move: move,
              ch: ch
            };
            var win = checkForWin(board, ch);
            if (win) {
              Object.assign(move, win);
            } else {
              var draw = checkForDraw(board);
              if (draw) {
                Object.assign(move, draw);
              }
            }
            return move;
          }
        };
      });
    }
    return playActions;
  }
  function checkForWin(board, ch) {
    for (var _i = 0, _arr = [ch, opponent[ch]]; _i < _arr.length; _i++) {
      var _ch2 = _arr[_i];
      var _getPotentialWins = getPotentialWins(board, _ch2, 3),
        _getPotentialWins2 = _slicedToArray(_getPotentialWins, 1),
        win = _getPotentialWins2[0];
      if (win) {
        return {
          win: win.cells
        };
      }
    }
  }
  function checkForDraw(board) {
    var blanks = getBlankIndices(board);
    if (!blanks.length) {
      return {
        draw: true
      };
    }
  }
  function determineWinningMove(board, ch) {
    var _getPotentialWins3 = getPotentialWins(board, ch, 2),
      _getPotentialWins4 = _slicedToArray(_getPotentialWins3, 1),
      _getPotentialWins4$ = _getPotentialWins4[0],
      win = _getPotentialWins4$ === void 0 ? {
        blanks: []
      } : _getPotentialWins4$;
    return win.blanks[0];
  }
  function findFork(board, ch, random) {
    var forks = getIntersectionsOfPotentialWins(board, ch);
    return random ? pickRandomElement(forks) : forks[0];
  }
  function blockForks(board, ch, random) {
    var intersections = getIntersectionsOfPotentialWins(board, ch);
    var numberOfIntersections = intersections.length;
    var allForksCorners = intersections.every(function (fork) {
      return moves.corners.includes(fork);
    });
    if (numberOfIntersections === 1) {
      return intersections[0];
    }
    if (numberOfIntersections === 2 && allForksCorners) {
      return playSide(board, ch, random);
    }
    if (numberOfIntersections >= 2 && !allForksCorners) {
      return playCorner(board, ch, random);
    }
  }
  function playCenter(board, ch) {
    var gridWithoutNulls = board.filter(function (ch) {
      return ch;
    });
    if (gridWithoutNulls.length === 1 && !board[CENTER]) {
      return CENTER;
    }
  }
  function playOppositeCorner(board, ch) {
    if (board[CENTER] === opponent[ch]) {
      var corners = moves.corners.filter(function (corner) {
        return board[corner] === ch;
      });
      var _iterator = _createForOfIteratorHelper(corners),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var corner = _step.value;
          var opposite = oppositeCorners[corner];
          if (!board[opposite]) {
            return opposite;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  function playCorner(board, ch, random) {
    return findMoveByType(board, ch, 'corners', random, true);
  }
  function playSide(board, ch, random) {
    return findMoveByType(board, ch, 'sides', random);
  }
  function pickRandomMove(board) {
    var blanks = getBlankIndices(board);
    return pickRandomElement(blanks);
  }

  function ttt(board, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var playActions = getPlayActions(level);
    board = normalizeBoard(board);
    var _iterator = _createForOfIteratorHelper(playActions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var playAction = _step.value;
        var move = playAction(board, ch, random);
        if (move) {
          return move;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  exports.ttt = ttt;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
