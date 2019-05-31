import tttUtils from '../_lib/ttt-utils';

export function playCorner(grid, ch, random = true) {
  return tttUtils.findMoveByType(grid, ch, 'corners', random, true);
}
