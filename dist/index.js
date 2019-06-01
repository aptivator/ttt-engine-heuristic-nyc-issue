(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['ttt-engine-heuristic'] = {}));
}(this, function (exports) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var wins = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
  wins.side = [0, 1, 4, 7];
  var CENTER = 4;
  var opponent = {
    'x': 'o',
    'o': 'x'
  };
  var moves = {
    corners: [0, 2, 6, 8],
    sides: [1, 3, 5, 7],
    center: [CENTER]
  };
  var oppositeCorners = {
    0: 8,
    2: 6,
    6: 2,
    8: 0
  };

  var utils = {
    pickRandom: function pickRandom(arr) {
      var index = Math.floor(Math.random() * arr.length);
      return arr[index];
    }
  };

  var tttUtils = {
    blanks: function blanks(grid) {
      return grid.reduce(function (blanks, ch, index) {
        if (!ch) {
          blanks.push(index);
        }

        return blanks;
      }, []);
    },
    findMoveByType: function findMoveByType(grid, ch, moveType, random) {
      var _this = this;

      var preferSideWins = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var typeMoves = moves[moveType];
      typeMoves = typeMoves.filter(function (cell) {
        return !grid[cell];
      });

      if (typeMoves.length) {
        (function () {
          var potentials = _this.potentials(grid, ch, 1);

          var sidePotentials = potentials.filter(function (potential) {
            return potential.side;
          });
          var nonSidePotentials = potentials.filter(function (potential) {
            return !potential.side;
          });
          var movesInOnes = new Set();

          for (var _i = 0, _arr = [sidePotentials, nonSidePotentials]; _i < _arr.length; _i++) {
            var _potentials = _arr[_i];

            _potentials.forEach(function (potential) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = typeMoves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var cell = _step.value;

                  if (potential.blanks.includes(cell)) {
                    movesInOnes.add(cell);
                    break;
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
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

      return random ? utils.pickRandom(typeMoves) : typeMoves[0];
    },
    intersections: function intersections(grid, ch) {
      var potentials = this.potentials(grid, ch, 1);
      var cellCounts = potentials.reduce(function (cellCounts, potential) {
        var blanks = potential.blanks;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = blanks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var blank = _step2.value;

            if (!cellCounts[blank]) {
              cellCounts[blank] = 0;
            }

            cellCounts[blank]++;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return cellCounts;
      }, {});
      return Object.keys(cellCounts).reduce(function (intersections, blank) {
        if (cellCounts[blank] > 1) {
          intersections.push(+blank);
        }

        return intersections;
      }, []);
    },
    normalizeGrid: function normalizeGrid(grid) {
      if (!Array.isArray(grid)) {
        grid = grid.split('').map(function (ch) {
          return ch === ' ' ? null : ch;
        });
      }

      return grid;
    },
    potentials: function potentials(grid, ch, level) {
      winsLoop: for (var i = 0, potentials = []; i < 8; i++) {
        for (var j = 0, count = 0, blanks = [], taken = []; j < 3; j++) {
          var cell = wins[i][j];
          var _ch = grid[cell];

          if (_ch === ch) {
            count++;
            taken.push(cell);
          } else if (_ch) {
            continue winsLoop;
          } else {
            blanks.push(cell);
          }
        }

        if (count === level) {
          potentials.push({
            cells: wins[i].slice(),
            blanks: blanks,
            taken: taken,
            side: wins.side.includes(i)
          });
        }
      }

      return potentials;
    }
  };

  function checkForWinOrDraw(board, ch) {
    for (var _i = 0, _arr = [ch, opponent[ch]]; _i < _arr.length; _i++) {
      var _ch = _arr[_i];

      var _tttUtils$potentials = tttUtils.potentials(board, _ch, 3),
          _tttUtils$potentials2 = _slicedToArray(_tttUtils$potentials, 1),
          win = _tttUtils$potentials2[0];

      if (win) {
        return {
          ch: _ch,
          win: win.cells
        };
      }
    }

    var blanks = tttUtils.blanks(board);

    if (!blanks.length) {
      return {
        draw: true
      };
    }
  }

  function determineWinningMove(grid, ch) {
    var _tttUtils$potentials = tttUtils.potentials(grid, ch, 2),
        _tttUtils$potentials2 = _slicedToArray(_tttUtils$potentials, 1),
        _tttUtils$potentials3 = _tttUtils$potentials2[0],
        win = _tttUtils$potentials3 === void 0 ? {
      blanks: []
    } : _tttUtils$potentials3;

    return win.blanks[0];
  }

  function findFork(grid, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var forks = tttUtils.intersections(grid, ch);
    return random ? utils.pickRandom(forks) : forks[0];
  }

  function playSide(grid, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return tttUtils.findMoveByType(grid, ch, 'sides', random);
  }

  function playCorner(grid, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    return tttUtils.findMoveByType(grid, ch, 'corners', random, true);
  }

  function blockForks(grid, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var intersections = tttUtils.intersections(grid, ch);
    var length = intersections.length;
    var allForksCorners = intersections.every(function (fork) {
      return moves.corners.includes(fork);
    });

    if (length === 1) {
      return intersections[0];
    } else if (length === 2 && allForksCorners) {
      return playSide(grid, ch, random);
    } else if (length >= 2 && !allForksCorners) {
      return playCorner(grid, ch, random);
    }
  }

  function playCenter(grid, ch) {
    var gridWithoutNulls = grid.filter(function (ch) {
      return ch;
    });

    if (gridWithoutNulls.length === 1 && !grid[CENTER]) {
      return CENTER;
    }
  }

  function playOppositeCorner(grid, ch) {
    if (grid[CENTER] === opponent[ch]) {
      var corners = moves.corners.filter(function (corner) {
        return grid[corner] === ch;
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = corners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var corner = _step.value;
          var opposite = oppositeCorners[corner];

          if (!grid[opposite]) {
            return opposite;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  function pickRandomMove(grid, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var blanks = tttUtils.blanks(grid);
    return random ? utils.pickRandom(blanks) : blanks[0];
  }

  function ttt(board, ch) {
    var random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 9;
    var playActions = [checkForWinOrDraw, determineWinningMove, determineWinningMove, findFork, blockForks, playCenter, playOppositeCorner, playCorner, playSide];
    var actionsToPlayAsOpponent = [2, 4].map(function (id) {
      return id >= level ? id++ : id;
    });
    playActions.splice(level, 0, pickRandomMove);
    board = tttUtils.normalizeGrid(board);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = playActions.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            playAction = _step$value[1];

        var _grid = board.slice();

        var _ch = actionsToPlayAsOpponent.includes(index) ? opponent[ch] : ch;

        var move = playAction(_grid, _ch, random);

        if (move === undefined) {
          continue;
        }

        if (typeof move === 'number') {
          _grid[move] = ch;
          move = {
            move: move,
            ch: ch
          };

          var _ref = checkForWinOrDraw(_grid, ch) || {},
              win = _ref.win,
              draw = _ref.draw;

          if (win) {
            Object.assign(move, {
              win: win
            });
          }

          if (draw) {
            Object.assign(move, {
              draw: draw
            });
          }
        }

        return move;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  exports.ttt = ttt;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
