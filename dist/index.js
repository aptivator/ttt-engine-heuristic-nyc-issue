(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['ttt-engine-heuristic'] = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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
    isObjectLike: function isObjectLike(o) {
      return o !== null && _typeof(o) === 'object';
    },
    isRegularObject: function isRegularObject(o) {
      if (!this.isObjectLike(o) || this.toString(o) !== '[object Object]') {
        return false;
      }

      if (Object.getPrototypeOf(o) === null) {
        return true;
      }

      for (var proto = o; Object.getPrototypeOf(proto) !== null;) {
        proto = Object.getPrototypeOf(proto);
      }

      return Object.getPrototypeOf(o) === proto;
    },
    pickRandom: function pickRandom(arr) {
      var index = Math.floor(Math.random() * arr.length);
      return arr[index];
    },
    toString: function toString(value) {
      return Object.prototype.toString.call(value);
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
    findMoveByType: function findMoveByType(grid, ch, moveType) {
      var typeMoves = moves[moveType];
      typeMoves = typeMoves.filter(function (cell) {
        return !grid[cell];
      });

      if (typeMoves.length) {
        var potentials = tttUtils.potentials(grid, ch, 1);
        var movesInOnes = potentials.reduce(function (movesInOnes, potential) {
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

          return movesInOnes;
        }, new Set());

        if (movesInOnes.size) {
          typeMoves = Array.from(movesInOnes);
        }
      }

      return utils.pickRandom(typeMoves);
    },
    history: function history(grid, ch) {
      return Object.keys(moves).reduce(function (history, moveType) {
        history[moveType] = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = moves[moveType][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var cell = _step2.value;
            var _ch = grid[cell];

            if (_ch) {
              if (_ch === ch) {
                history[moveType].push(cell);
                history.totalCh++;
              }

              history.total++;
            }
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

        return history;
      }, {
        totalCh: 0,
        total: 0
      });
    },
    intersections: function intersections(grid, ch) {
      var potentials = this.potentials(grid, ch, 1);
      var cellCounts = potentials.reduce(function (cellCounts, potential) {
        var blanks = potential.blanks;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = blanks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var blank = _step3.value;

            if (!cellCounts[blank]) {
              cellCounts[blank] = 0;
            }

            cellCounts[blank]++;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
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
      outerLoop: for (var i = 0, potentials = []; i < 8; i++) {
        for (var j = 0, count = 0, blanks = [], taken = []; j < 3; j++) {
          var cell = wins[i][j];
          var _ch = grid[cell];

          if (_ch === ch) {
            count++;
            taken.push(cell);
          } else if (_ch) {
            continue outerLoop;
          } else {
            blanks.push(cell);
          }
        }

        if (count === level) {
          potentials.push({
            cells: wins[i].slice(),
            blanks: blanks,
            taken: taken
          });
        }
      }

      return potentials;
    }
  };

  function checkForWinOrDraw(grid, ch) {
    var blanks = tttUtils.blanks(grid);
    var check = {
      ch: ch
    };

    if (!blanks.length) {
      return Object.assign(check, {
        draw: true
      });
    }

    var potentials = tttUtils.potentials(grid, ch, 3);

    var _potentials = _slicedToArray(potentials, 1),
        win = _potentials[0];

    if (win) {
      return Object.assign(check, {
        win: win.cells
      });
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
    var forks = tttUtils.intersections(grid, ch);
    return utils.pickRandom(forks);
  }

  function playSide(grid, ch) {
    return tttUtils.findMoveByType(grid, ch, 'sides');
  }

  function playCorner(grid, ch) {
    return tttUtils.findMoveByType(grid, ch, 'corners');
  }

  function blockForks(grid, ch) {
    var intersections = tttUtils.intersections(grid, ch);
    var length = intersections.length;
    var allForksCorners = intersections.every(function (fork) {
      return moves.corners.includes(fork);
    });

    if (length === 1) {
      return intersections[0];
    } else if (length === 2 && allForksCorners) {
      return playSide(grid, ch);
    } else if (length >= 2 && !allForksCorners) {
      return playCorner(grid, ch);
    }
  }

  function playCenter(grid, ch) {
    var history = tttUtils.history(grid, opponent[ch]);

    if (history.total === 1 && !grid[CENTER]) {
      return CENTER;
    }
  }

  function playOppositeCorner(grid, ch) {
    if (grid[CENTER] === opponent[ch]) {
      var _tttUtils$history = tttUtils.history(grid, ch),
          corners = _tttUtils$history.corners;

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

  function pickRandomMove(grid) {
    var blanks = tttUtils.blanks(grid);
    return utils.pickRandom(blanks);
  }

  function ttt(grid, ch) {
    var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
    var playActions = [checkForWinOrDraw, determineWinningMove, determineWinningMove, findFork, blockForks, playCenter, playOppositeCorner, playCorner, playSide];
    var actionsToPlayAsOpponent = [2, 4].map(function (id) {
      return id >= level ? id++ : id;
    });
    playActions.splice(level + 1, 0, pickRandomMove);
    grid = tttUtils.normalizeGrid(grid);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = playActions.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            index = _step$value[0],
            playAction = _step$value[1];

        var _grid = grid.slice();

        var _ch = actionsToPlayAsOpponent.includes(index) ? opponent[ch] : ch;

        var move = playAction(_grid, _ch);

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
