import tttUtils from '../_lib/ttt-utils';

export function playSide(grid, ch) {
  return tttUtils.findMoveByType(grid, ch, 'sides');
}
