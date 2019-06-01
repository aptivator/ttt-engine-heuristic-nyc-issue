# ttt-engine-heuristic

### Introduction

The engine implements a heuristic tic-tac-toe strategy and  can mimic a perfect 
player or various levels of an imperfect player.  The strategy was "borrowed"
and slightly modified from an existing [approach]().  The library was written 
for educational purposes and its construction is described in detail in my book 
[JavaScript by Application: Tic-Tac-Toe 9 Ways]().

### Installation

To install from npm:

```
npm install --save ttt-engine-heuristic
```
To install from github:
```
npm install --save npm install git+https://git@github.com/aptivator/ttt-engine-heuristic.git
```

### Usage

#### Engine Inputs

The library accepts the following parameters (in that order):

* A string or an array representation of a game **board**.  An example of a
string board would be `x___o____` (underscores represent spaces).  An equivalent
array version is `['x', null, null, null, 'o', null, null, null, null]`.

* A **character** that is to be played by the engine.  Only lowercase `x` or `o` is
allowed.

* An _optional_ **random** flag to indicate if a move is to be picked stochastically 
out of the available best moves.

* An _optional_ **strength** parameter to indicate at what level of "competence" the engine
is to perform.  A value of `1` sets the engine to play randomly.  Increasing
this setting increases the library's performance all the way to a perfect player 
(a value of `9`, which is also default).

#### Engine Inputs Example

```js
import {ttt} from 'ttt-engine-heuristic';

/* or set board as a string */
/* let board = '         '; */
let board = [
  null, null, null,
  null, null, null, 
  null, null, null
];

/* find the best random move for x */
let play = ttt(board, 'x');

/* 
  pick the first best move 
  (makes the engine play consistently for a given board)
*/
play = ttt(board, 'x', false);

/* select a random move at the lowest level of performance */
play = ttt(board, 'x', true, 1);
```

#### Engine Output

The library returns an object with the following possible properties:

* `ch` - a character that is to be placed (either `x` or `o`)
* `move` - an index of an 9-cell board array at which a character is to be 
positioned
* `win` - a 3-cell array of indices that represents a win (e.g., `[0, 1, 2]`, `[0, 3, 6]`)
* `draw` - a boolean flag indicating a draw

#### Examples

1. Picks a random best move (an index in a 9-cell board array) and
indicates what character (`x` or `o`) to place there.

```js
let board = [
  null, null, null,
  null, null, null, 
  null, null, null
];

let play = ttt(board, 'x');
/*
  play = {
    ch: 'x',
    move: 0 or 2 or 6 or 8
  };
*/
```

2. Picks a consistent perfect move (given the same board).

```js
let board = [
  'x', null, null,
  null, null, null, 
  null, 'o', null
];

let play = ttt(board, 'x', false);
/*
  play = {
    ch: 'x',
    move: 2
  };
*/
```

3. Finds an opponent's win.  (There is no need to include a `move` property in 
the result.  The `ch` is included in case UI may need that).

```js
let board = [
  'x', 'o', 'x',
  null, 'o', null, 
  null, 'o', 'x'
];

let play = ttt(board, 'x');
/*
  play = {
    ch: 'o',
    win: [1, 4, 7]
  };
*/
```

4. Selects a winning move.  (In this case, a `move` variable is included, because
UI or other interface may need to know where to place a winning character).

```js
let board = [
  'x', 'o', 'x',
  null, 'o', null,
  'o', null, 'x'
];

let play = ttt(board, 'x');
/*
  play = {
    ch: 'x',
    move: 5,
    win: [2, 5, 8]
  };
*/
```

5. Diagnoses a draw already played by an opponent. (There is no need to include 
`move` and `ch` variables).

```js
let board = [
  'x', 'o', 'x',
  'x', 'o', 'o',
  'o', 'x', 'x'
];

let play = ttt(board, 'x');
/*
  play = {
    draw: true
  };
*/
```

6. Plays a draw.

```js
let board = [
  'x', 'o', null,
  'x', 'o', 'o',
  'o', 'x', 'x'
];

let play = ttt(board, 'x');
/*
  play = {
    ch: 'x',
    move: 2,
    draw: true
  };
*/
```
