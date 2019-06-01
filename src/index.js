import {opponent}             from './_lib/vars';
import tttUtils               from './_lib/ttt-utils';
import {checkForWinOrDraw}    from './play-actions/00-check-for-win-or-draw';
import {determineWinningMove} from './play-actions/01-determine-winning-move';
import {findFork}             from './play-actions/02-find-fork';
import {blockForks}           from './play-actions/03-block-forks';
import {playCenter}           from './play-actions/04-play-center';
import {playOppositeCorner}   from './play-actions/05-play-opposite-corner';
import {playCorner}           from './play-actions/06-play-corner';
import {playSide}             from './play-actions/07-play-side';
import {pickRandomMove}       from './play-actions/08-pick-random-move';

export function ttt(board, ch, random = true, level = 9) {
  let playActions = [
    checkForWinOrDraw,
    determineWinningMove,
    determineWinningMove,
    findFork,
    blockForks,
    playCenter,
    playOppositeCorner,
    playCorner,
    playSide
  ];

  let actionsToPlayAsOpponent = [2, 4].map(id => id >= level ? id++ : id);
  playActions.splice(level, 0, pickRandomMove);
  board = tttUtils.normalizeGrid(board);
  
  for(let [index, playAction] of playActions.entries()) {
    let _grid = board.slice();
    let _ch = actionsToPlayAsOpponent.includes(index) ? opponent[ch] : ch;
    let move = playAction(_grid, _ch, random);
    
    if(move === undefined) {
      continue;
    }
    
    if(typeof move === 'number') {
      _grid[move] = ch;
      move = {move, ch};
      let {win, draw} = checkForWinOrDraw(_grid, ch) || {};
      
      if(win) {
        Object.assign(move, {win});
      }
      
      if(draw) {
        Object.assign(move, {draw});
      }
    }
    
    return move;
  }
}
