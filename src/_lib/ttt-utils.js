import {wins, moves} from './vars';
import utils         from './utils';

export default {
  blanks(grid) {
    return grid.reduce((blanks, ch, index) => {
      if(!ch) {
        blanks.push(index);
      }
      
      return blanks;
    }, []);
  },
  
  findMoveByType(grid, ch, moveType) {
    let {[moveType]: typeMoves} = moves;
    typeMoves = typeMoves.filter(cell => !grid[cell]);

    if(typeMoves.length) {
      let potentials = this.potentials(grid, ch, 1);
      let movesInOnes = potentials.reduce((movesInOnes, potential) => {
        for(var cell of typeMoves) {
          if(potential.blanks.includes(cell)) {
            movesInOnes.add(cell);
            break;
          }
        }
        
        return movesInOnes;
      }, new Set());


      if(movesInOnes.size) {
        typeMoves = Array.from(movesInOnes);
      }
    }
    
    return utils.pickRandom(typeMoves);
  },
  
  history(grid, ch) {
    return Object.keys(moves).reduce((history, moveType) => {
      history[moveType] = [];
      
      for(let cell of moves[moveType]) {
        let _ch = grid[cell];
        
        if(_ch) {
          if(_ch === ch) {
            history[moveType].push(cell);
            history.totalCh++;
          }
          
          history.total++;
        }
      }
      
      return history;
    }, {totalCh: 0, total: 0});
  },
  
  intersections(grid, ch) {
    let potentials = this.potentials(grid, ch, 1);
    let cellCounts = potentials.reduce((cellCounts, potential) => {
      let {blanks} = potential;
      
      for(let blank of blanks) {
        if(!cellCounts[blank]) {
          cellCounts[blank] = 0;
        }
        
        cellCounts[blank]++;
      }
      
      return cellCounts;
    }, {});
    
    return Object.keys(cellCounts).reduce((intersections, blank) => {
      if(cellCounts[blank] > 1) {
        intersections.push(+blank);
      }
      
      return intersections;
    }, []);
  },
  
  normalizeGrid(grid) {
    if(!Array.isArray(grid)) {
      grid = grid.split('').map(ch => ch === ' ' ? null : ch);
    }
    
    return grid;
  },
  
  potentials(grid, ch, level) {
    outerLoop: for(var i = 0, potentials = []; i < 8; i++) {
      for(var j = 0, count = 0, blanks = [], taken = []; j < 3; j++) {
        let cell = wins[i][j];
        let _ch = grid[cell];
        
        if(_ch === ch) {
          count++;
          taken.push(cell);
        } else if(_ch) {
          continue outerLoop;
        } else {
          blanks.push(cell);
        }
      }
      
      if(count === level) {
        potentials.push({
          cells: wins[i].slice(),
          blanks,
          taken
        });
      }
    }
    
    return potentials;
  }
};
