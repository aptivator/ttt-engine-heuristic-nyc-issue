import {expect}              from 'chai';
import {ttt}                 from '../src';
import {generateUniqueMoves} from './__test-utils/generate-unique-moves';

describe('ttt() engine entrypoint', () => {
  it('accepts grid as a string', () => {
    let grid = 'ox       ';
    let moves = generateUniqueMoves(ttt, grid, 'o');
    expect(moves).to.have.members([6]);
  });
  
  it('assesses an existing win', () => {
    let grid = [
      'o', null, null,
      null, 'o', null,
      null, null, 'o'
    ];
    
    let move = ttt(grid, 'o');
    expect(move).to.deep.equal({win: [0, 4, 8], ch: 'o'});
  });
  
  it('picks a winning move', () => {
    let grid = [
      'o', null, null,
      null, 'o', null,
      null, null, null
    ];    
    
    let move = ttt(grid, 'o');
    expect(move).to.deep.equal({move: 8, ch: 'o', win: [0, 4, 8]});
  });
  
  it(`it blocks an opponent's winning move`, () => {
    let grid = [
      'o', null, null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = ttt(grid, 'x');
    expect(move).to.deep.equal({move: 8, ch: 'x'});
  });
  
  it('finds a forks and picks a random fork', () => {
    let grid = [
      'o', null, null,
      'x', 'o', null,
      null, null, 'x'
    ];    

    let moves = generateUniqueMoves(ttt, grid, 'o');
    expect(moves).to.have.members([1, 2]);
  });
  
  it('blocks the only fork directly', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, 'x', null
    ];
    
    let move = ttt(grid, 'o');
    expect(move).to.deep.equal({move: 6, ch: 'o'});
  });
  
  it('plays corner when opponent has non-opposite two forks', () => {
    let grid = [
      'o', null, null,
      'x', 'o', null,
      null, null, 'x'
    ];
    
    let move = ttt(grid, 'x');
    expect(move).to.deep.equal({move: 2, ch: 'x'});
  });
  
  it('attacks from the side when opponent has opposite corner forks', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, 'o'
    ];    
    
    let moves = generateUniqueMoves(ttt, grid, 'x');
    expect(moves).to.have.members([1, 3, 5, 7]);
  });
  
  it('plays corner when opponent has more than 2 forks', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(ttt, grid, 'o');
    expect(moves).to.have.members([2, 6]);
  });
  
  it('picks center when opponent has picked the first move', () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = ttt(grid, 'o');
    expect(move).to.deep.equal({move: 4, ch: 'o'});
  });
  
  it('mirrors an already picked corner if opponent has center', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = ttt(grid, 'x');
    expect(move).to.deep.equal({move: 8, ch: 'x'});
  });
  
  it('plays a random corner when the board is empty', () => {
    let grid = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let moves = generateUniqueMoves(ttt, grid, 'x');
    expect(moves).to.have.members([0, 2, 6, 8]);
  });
  
  it('selects corners of potential side wins', () => {
    let grid = [
      null, 'o', null,
      null, null, null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(ttt, grid, 'x');
    expect(moves).to.have.members([2, 6]);    
  });
  
  it('chooses a random side when nothing else is available', () => {
    let grid = [
      'x', null, 'o',
      'o', null, 'x',
      'x', null, 'o'
    ];

    let moves = generateUniqueMoves(ttt, grid, 'x');
    expect(moves).to.have.members([1, 7]);
  });
});
