import {expect}              from 'chai';
import {playSide}            from '../../src/play-actions/07-play-side';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('playSide() play action', () => {
  it('picks a random side move', () => {
    let grid = [
      null, null, null, 
      null, null, null,
      null, null, null
    ];

    let moves = generateUniqueMoves(playSide, grid, 'x');
    expect(moves).to.have.members([1, 3, 5, 7]);
  });
  
  it('returns undefined when there are no side moves', () => {
    let grid = [
      'x', 'o', null,
      'x', null, 'o',
      'o', 'x', null
    ];
    
    let move = playSide(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
