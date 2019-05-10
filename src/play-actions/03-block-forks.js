import {moves}      from '../_lib/vars';
import tttUtils     from '../_lib/ttt-utils';
import {playSide}   from './07-play-side';
import {playCorner} from './06-play-corner';

export function blockForks(grid, ch) {
  let intersections = tttUtils.intersections(grid, ch);
  let {length} = intersections;
  let allForksCorners = intersections.every(fork => moves.corners.includes(fork));
  
  if(length === 1) {
    return intersections[0];
  } else if(length === 2 && allForksCorners) {
    return playSide(grid, ch);
  } else if(length >= 2 && !allForksCorners) {
    return playCorner(grid, ch);
  }
}
