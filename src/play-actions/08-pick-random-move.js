import tttUtils from '../_lib/ttt-utils';
import utils    from '../_lib/utils';

export function pickRandomMove(grid, ch, random = true) {
  let blanks = tttUtils.blanks(grid);
  return random ? utils.pickRandom(blanks) : blanks[0];
}
