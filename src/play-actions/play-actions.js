import {CENTER, moves, opponent, oppositeCorners}          from '../_lib/vars';
import {findMoveByType, getBlankIndices}                   from '../_lib/ttt-utils';
import {getIntersectionsOfPotentialWins, getPotentialWins} from '../_lib/ttt-utils';
import {pickRandomElement}                                 from '../_lib/utils';
import {levelToPlayActionsMap}                             from './_lib/play-actions-vars';

export function getPlayActions(level) {
  level = level < 0 ? 0 : level > 10 ? 10 : level;
  let playActions = levelToPlayActionsMap[level];

  if(!playActions) {
    levelToPlayActionsMap[level] = playActions = [
      {playAction: checkForWin},
      {playAction: checkForDraw},
      {playAction: determineWinningMove},
      {playAction: determineWinningMove, playAsOpponent: true},
      {playAction: findFork},
      {playAction: blockForks, playAsOpponent: true},
      {playAction: playCenter},
      {playAction: playOppositeCorner},
      {playAction: playCorner},
      {playAction: playSide}
    ];

    playActions.splice(level, 0, {playAction: pickRandomMove});

    playActions.forEach(({playAction, playAsOpponent}, index) => {
      playActions[index] = function(board, ch, random) {
        let _ch = playAsOpponent ? opponent[ch] : ch;
        board = board.slice();

        let move = playAction(board, _ch, random);

        if(move?.constructor === Object) {
          return Object.assign(move, {ch});
        }

        if(typeof move === 'number') {
          board[move] = ch;
          move = {move, ch};
          let win = checkForWin(board, ch);

          if(win) {
            Object.assign(move, win);
          } else {
            let draw = checkForDraw(board);

            if(draw) {
              Object.assign(move, draw);
            }
          }

          return move;
        }
      }
    });
  }

  return playActions;
}

function checkForWin(board, ch) {
  for(let ch of [ch, opponent[ch]]) {
    let [win] = getPotentialWins(board, ch, 3);

    if(win) {
      return {win: win.cells};
    }
  }
}

function checkForDraw(board) {
  let blanks = getBlankIndices(board);

  if(!blanks.length) {
    return {draw: true};
  }
}

function determineWinningMove(board, ch) {
  let [win = {blanks: []}] = getPotentialWins(board, ch, 2);
  return win.blanks[0];
}

function findFork(board, ch, random) {
  let forks = getIntersectionsOfPotentialWins(board, ch);
  return random ? pickRandomElement(forks) : forks[0];
}

function blockForks(board, ch, random) {
  let intersections = getIntersectionsOfPotentialWins(board, ch);
  let {length: numberOfIntersections} = intersections;
  let allForksCorners = intersections.every((fork) => moves.corners.includes(fork));
  
  if(numberOfIntersections === 1) {
    return intersections[0];
  }
  
  if(numberOfIntersections === 2 && allForksCorners) {
    return playSide(board, ch, random);
  }
  
  if(numberOfIntersections >= 2 && !allForksCorners) {
    return playCorner(board, ch, random);
  }
}

function playCenter(board, ch) {
  let gridWithoutNulls = board.filter(ch => ch);

  if(gridWithoutNulls.length === 1 && !board[CENTER]) {
    return CENTER;
  }
}

function playOppositeCorner(board, ch) {
  if(board[CENTER] === opponent[ch]) {
    let corners = moves.corners.filter((corner) => board[corner] === ch);
    
    for(let corner of corners) {
      let opposite = oppositeCorners[corner];
      
      if(!board[opposite]) {
        return opposite;
      }
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
  let blanks = getBlankIndices(board);
  return pickRandomElement(blanks);
}
