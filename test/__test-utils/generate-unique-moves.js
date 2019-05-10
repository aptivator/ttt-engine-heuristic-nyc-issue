import utils from '../../src/_lib/utils';

export function generateUniqueMoves(callback, ...params) {
  for(var i = 0, moves = new Set(); i < 200; i++) {
    let move = callback(...params);
    
    if(utils.isRegularObject(move)) {
      ({move} = move);
    }
    
    moves.add(move);
  }  
  
  return Array.from(moves);
}
