import utils    from '../_lib/utils';
import tttUtils from '../_lib/ttt-utils';

export function findFork(grid, ch) {
  let forks = tttUtils.intersections(grid, ch);
  return utils.pickRandom(forks);
}
