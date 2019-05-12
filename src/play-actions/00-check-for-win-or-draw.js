import tttUtils from '../_lib/ttt-utils';

export function checkForWinOrDraw(grid, ch) {
  let check = {ch};
  let potentials = tttUtils.potentials(grid, ch, 3);
  let [win] = potentials;
  
  if(win) {
    return Object.assign(check, {win: win.cells});
  }
  
  let blanks = tttUtils.blanks(grid);
  
  if(!blanks.length) {
    return Object.assign(check, {draw: true});
  }
}
