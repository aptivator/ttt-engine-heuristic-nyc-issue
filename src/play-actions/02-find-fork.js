import utils    from '../_lib/utils';
import tttUtils from '../_lib/ttt-utils';

export function findFork(grid, ch, random = true) {
  let forks = tttUtils.intersections(grid, ch);
  return random ? utils.pickRandom(forks) : forks[0];
}
