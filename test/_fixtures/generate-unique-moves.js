export function generateUniqueMoves(callback, iteractions, ...params) {
  for(var i = 0, moves = new Set(); i < iteractions; i++) {
    let move = callback(...params);

    if(typeof move === 'object' && move.constructor === Object) {
      ({move} = move);
    }

    moves.add(move);
  }

  return Array.from(moves);
}
