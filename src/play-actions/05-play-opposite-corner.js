import tttUtils                            from '../_lib/ttt-utils';
import {opponent, CENTER, oppositeCorners} from '../_lib/vars';

export function playOppositeCorner(grid, ch) {
  if(grid[CENTER] === opponent[ch]) {
    let {corners} = tttUtils.history(grid, ch);
    
    for(let corner of corners) {
      let opposite = oppositeCorners[corner];
      
      if(!grid[opposite]) {
        return opposite;
      }
    }
  }  
}
