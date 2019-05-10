import {expect}              from 'chai';
import {playCorner}          from '../../src/play-actions/06-play-corner';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('playCorner() action', () => {
  it('selects a random corner move', () => {
    let grid = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let moves = generateUniqueMoves(playCorner, grid, 'x');
    expect(moves).to.have.members([0, 2, 6, 8]);
  });
  
  it('selects a random corner move to complete a random potential if available', () => {
    let grid = [
      null, null, 'x',
      null, 'o', null,
      null, null, null
    ];

    let moves = generateUniqueMoves(playCorner, grid, 'x');
    expect(moves).to.have.members([0, 8]);
  });
  
  it('returns undefined if no corners are available', () => {
    let grid = [
      'o', null, 'x',
      null, 'o', null,
      'o', null, 'x'
    ];  
    
    let move = playCorner(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
