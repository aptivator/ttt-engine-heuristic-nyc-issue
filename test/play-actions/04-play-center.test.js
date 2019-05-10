import {expect}     from 'chai';
import {CENTER}     from '../../src/_lib/vars';
import {playCenter} from '../../src/play-actions/04-play-center';

describe('playCenter() play action', () => {
  it('plays center when available and opponent already made one move', () => {
    let grid = [
      'o', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = playCenter(grid, 'x');
    expect(move).to.equal(CENTER);
  });
  
  it('returns undefined when the board is empty', () => {
    let grid = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = playCenter(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
