import {expect}   from 'chai';
import {findFork} from '../../src/play-actions/02-find-fork.js';

describe('findFork() play action', () => {
  it('finds a fork', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, 'o', 'x'
    ];
    
    let move = findFork(grid, 'x');
    expect([2, 5]).to.include(move);
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
