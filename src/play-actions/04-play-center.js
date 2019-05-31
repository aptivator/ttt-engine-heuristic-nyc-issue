import {CENTER} from '../_lib/vars';

export function playCenter(grid, ch) {
  let gridWithoutNulls = grid.filter(ch => ch);

  if(gridWithoutNulls.length === 1 && !grid[CENTER]) {
    return CENTER;
  }
}
