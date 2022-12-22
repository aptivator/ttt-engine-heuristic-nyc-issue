import {normalizeBoard} from './_lib/ttt-utils';
import {getPlayActions} from './play-actions/play-actions';

export function ttt(board, ch, random = true, level = 10) {
  let playActions = getPlayActions(level);
  board = normalizeBoard(board);
  
  for(let playAction of playActions) {
    let move = playAction(board, ch, random);
   
    if(move) {
      return move;
    }
  }
}
