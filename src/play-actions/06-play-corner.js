import tttUtils from '../_lib/ttt-utils';

export function playCorner(grid, ch) {
  return tttUtils.findMoveByType(grid, ch, 'corners');
}
