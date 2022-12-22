import {pickRandomElement} from './utils';
import {moves, wins}       from './vars';

export function findMoveByType(board, ch, moveType, random, preferSideWins = false) {
  let {[moveType]: typeMoves} = moves;
  typeMoves = typeMoves.filter((cell) => !board[cell]);

  if(typeMoves.length) {
    let potentialWins = getPotentialWins(board, ch, 1);
    let sidePotentialWins = potentialWins.filter((potentialWin) => potentialWin.sideWin);
    let nonSidePotentialWins = potentialWins.filter((potentialWin) => !potentialWin.sideWin);
    let movesInOnes = new Set();
    
    for(let potentialWins of [sidePotentialWins, nonSidePotentialWins]) {
      potentialWins.forEach((potentialWin) => {
        for(let cell of typeMoves) {
          if(potentialWin.blanks.includes(cell)) {
            movesInOnes.add(cell);
            break;
          }
        }
      });
      
      if(movesInOnes.size && preferSideWins) {
        break;
      }
    }

    if(movesInOnes.size) {
      typeMoves = Array.from(movesInOnes);
    }
  }
  
  return random ? pickRandomElement(typeMoves) : typeMoves[0];
}

export function getBlankIndices(board) {
  for(var i = 0, blanks = [], {length} = board; i < length; i++) {
    if(!board[i]) {
      blanks.push(i);
    }  
  }

  return blanks;
}

export function getIntersectionsOfPotentialWins(board, ch) {
  let potentialWins = getPotentialWins(board, ch, 1);
  let cellCounts = potentialWins.reduce((cellCounts, {blanks}) => {
    for(let blank of blanks) {
      cellCounts[blank] ??= 0;
      cellCounts[blank]++;
    }
    
    return cellCounts;
  }, {});

  return Object.entries(cellCounts).reduce((intersections, [blankIndex, cellCount]) => {
    if(cellCount > 1) {
      intersections.push(+blankIndex);
    }

    return intersections;
  }, []);
}

export function getPotentialWins(board, ch, requiredNumberOfOccupiedCells) {
  winsLoop: 
  for(var i = 0, potentialWins = []; i < wins.length; i++) {
    let {cells, sideWin} = wins[i];

    for(var j = 0, numberOfOccupiedCells = 0, blanks = [], taken = []; j < cells.length; j++) {
      let cell = cells[j];
      let _ch = board[cell];

      if(_ch === ch) {
        numberOfOccupiedCells++;
        taken.push(cell);
        continue;
      } 

      if(_ch) {
        continue winsLoop;
      }

      blanks.push(cell);
    }
    
    if(numberOfOccupiedCells === requiredNumberOfOccupiedCells) {
      potentialWins.push({
        cells: cells.slice(),
        blanks,
        taken,
        sideWin
      });
    }
  }
  
  return potentialWins;
}

export function normalizeBoard(board) {
  if(typeof board === 'string') {
    board = board.split('').map((ch) => ch === ' ' ? null : ch); 
  }

  return board;
}
