import {expect} from 'chai';
import {determineWinningMove} from '../../src/play-actions/01-determine-winning-move';

describe('determineWinningMove() play action', () => {
  it('finds a winning move', () => {
    let grid = [
      'x', 'o', 'o',
      'o', 'x', null,
      'x', null, null,
    ];
    
    let move = determineWinningMove(grid, 'x');
    expect(move).to.equal(8);
  });
  
  it('returns undefined when there is no winning move', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, 'x', null
    ];
    
    let move = determineWinningMove(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
