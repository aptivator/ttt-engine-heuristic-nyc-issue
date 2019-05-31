import {expect}              from 'chai';
import {pickRandomMove}      from '../../src/play-actions/08-pick-random-move';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('pickRandomMove() play action', () => {
  it('picks any available moves', () => {
    let grid = [
      'x', 'o', 'x',
      null, 'o', null,
      null, 'x', 'o'
    ];
    
    let moves = generateUniqueMoves(pickRandomMove, grid);
    expect(moves).to.have.members([3, 5, 6]);
  });
  
  it('picks the same available move given the same board', () => {
    let grid = [
      'x', 'o', 'x',
      null, 'o', null,
      null, 'x', 'o'
    ];
    
    let moves = generateUniqueMoves(pickRandomMove, grid, null, false);
    expect(moves).to.deep.equal([3]);
  });  
});
