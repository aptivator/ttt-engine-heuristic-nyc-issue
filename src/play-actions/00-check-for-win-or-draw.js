import {opponent} from '../_lib/vars';
import tttUtils   from '../_lib/ttt-utils';

export function checkForWinOrDraw(board, ch) {
  for(let ch of [ch, opponent[ch]]) {
    let [win] = tttUtils.potentials(board, ch, 3);
    
    if(win) {
      return {ch, win: win.cells};
    }
  }
  
  let blanks = tttUtils.blanks(board);
  
  if(!blanks.length) {
    return {draw: true};
  }
}
