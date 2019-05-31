import {expect}              from 'chai';
import {findFork}            from '../../src/play-actions/02-find-fork.js';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('findFork() play action', () => {
  it('finds a random fork', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, 'o', 'x'
    ];
    
    let moves = generateUniqueMoves(findFork, grid, 'x');
    expect(moves).to.have.members([2, 5]);
  });
  
  it('finds another fork', () => {
    let board = [
      'x', null, 'o',
      'o', null, null,
      'x', null, null
    ];
    
    let move = findFork(board, 'x', false);
    console.log(move);
  });
  
  it('picks the same fork move for the same board', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, 'o', 'x'
    ];
    
    let moves = generateUniqueMoves(findFork, grid, 'x', false);
    expect(moves).to.deep.equal([2]); 
  });
  
  it('returns undefined when there is no fork', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, null
    ];
    
    let move = findFork(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
