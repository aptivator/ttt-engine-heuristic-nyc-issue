import tttUtils from '../_lib/ttt-utils';
import utils    from '../_lib/utils';

export function pickRandomMove(grid) {
  let blanks = tttUtils.blanks(grid);
  return utils.pickRandom(blanks);
}
