import tttUtils from '../_lib/ttt-utils';

export function playSide(grid, ch, random = true) {
  return tttUtils.findMoveByType(grid, ch, 'sides', random);
}
