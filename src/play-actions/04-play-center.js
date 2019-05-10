import tttUtils           from '../_lib/ttt-utils';
import {opponent, CENTER} from '../_lib/vars';

export function playCenter(grid, ch) {
  let history = tttUtils.history(grid, opponent[ch]);
  
  if(history.total === 1 && !grid[CENTER]) {
    return CENTER;
  }
}
