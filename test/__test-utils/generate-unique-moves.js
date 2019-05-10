import _ from 'lodash';

export function generateUniqueMoves(callback, ...params) {
  for(var i = 0, moves = new Set(); i < 200; i++) {
    let move = callback(...params);
    
    if(_.isPlainObject(move)) {
      ({move} = move);
    }
    
    moves.add(move);
  }  
  
  return Array.from(moves);
}
