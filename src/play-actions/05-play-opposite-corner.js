import {opponent, CENTER, oppositeCorners, moves} from '../_lib/vars';

export function playOppositeCorner(grid, ch) {
  if(grid[CENTER] === opponent[ch]) {
    let corners = moves.corners.filter(corner => grid[corner] === ch);
    
    for(let corner of corners) {
      let opposite = oppositeCorners[corner];
      
      if(!grid[opposite]) {
        return opposite;
      }
    }
  }  
}
