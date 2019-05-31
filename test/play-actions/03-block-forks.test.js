import {expect}              from 'chai';
import {blockForks}          from '../../src/play-actions/03-block-forks';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('blockForks() play action', () => {
  it('blocks one intersection directly', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, 'x', null
    ];
    
    let move = blockForks(grid, 'x');
    expect(move).to.equal(6);
  });
  
  it('blocks two intersections by random side attack', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(blockForks, grid, 'x');
    expect(moves).to.have.members([1, 3, 5, 7]);
  });
  
  it('blocks two intersections by the same side attack (given the same board)', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(blockForks, grid, 'x', false);
    expect(moves).to.deep.equal([1]);
  });
  
  it('blocks more than two intersections by random corner attack', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, 'x'
    ];

    let moves = generateUniqueMoves(blockForks, grid, 'x');
    expect(moves).to.have.members([2, 6]);
  });
  
  it('returns undefined if there are no forks to block', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, null
    ];
    
    let move = blockForks(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
