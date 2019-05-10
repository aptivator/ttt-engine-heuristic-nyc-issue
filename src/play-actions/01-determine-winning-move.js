import tttUtils from '../_lib/ttt-utils';

export function determineWinningMove(grid, ch) {
  let [win = {blanks: []}] = tttUtils.potentials(grid, ch, 2);
  return win.blanks[0];
}
