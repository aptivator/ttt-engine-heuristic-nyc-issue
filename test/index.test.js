import {expect}              from 'chai';
import {ttt}                 from '../src';
import {generateUniqueMoves} from './_fixtures/generate-unique-moves';

describe('ttt() engine entrypoint', () => {
  it('accepts board as a string', () => {
    let board = 'ox       ';
    let move = ttt(board, 'o');
    expect(move.move).to.equal(6);
  });
  
  it('assesses an existing win', () => {
    let board = [
      'o', null, null,
      null, 'o', null,
      null, null, 'o'
    ];
    
    let move = ttt(board, 'o');
    expect(move).to.deep.equal({win: [0, 4, 8], ch: 'o'});
  });
 
  it('diagnoses an existing draw', () => {
    let board = [
      'x', 'o', 'x',
      'o', 'o', 'x',
      'x', 'x', 'o'
    ];
    
    let move = ttt(board, 'x');
    expect(move).to.deep.equal({ch: 'x', draw: true});
  });  

  it('picks a winning move', () => {
    let board = [
      'o', null, null,
      null, 'o', null,
      null, null, null
    ];    
    
    let move = ttt(board, 'o');
    expect(move).to.deep.equal({move: 8, ch: 'o', win: [0, 4, 8]});
  });

  it('detects a draw', () => {
    let board = [
      'x', 'o', 'x',
      'o', 'o', 'x',
      'x', 'x', null
    ];
    
    let move = ttt(board, 'o');
    expect(move).to.deep.equal({ch: 'o', draw: true, move: 8});
  });
    
  it(`it blocks an opponent's winning move`, () => {
    let board = [
      'o', null, null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = ttt(board, 'x');
    expect(move).to.deep.equal({move: 8, ch: 'x'});
  });
  
  it('finds a forks and picks a random fork', () => {
    let board = [
      'o', null, null,
      'x', 'o', null,
      null, null, 'x'
    ];    

    let moves = generateUniqueMoves(ttt, 10, board, 'o');
    expect(moves).to.have.members([1, 2]);
  });
  
  it('blocks the only fork directly', () => {
    let board = [
      'x', null, null,
      null, 'o', null,
      null, 'x', null
    ];
    
    let move = ttt(board, 'o');
    expect(move).to.deep.equal({move: 6, ch: 'o'});
  });
  
  it('plays corner when opponent has non-opposite two forks', () => {
    let board = [
      'o', null, null,
      'x', 'o', null,
      null, null, 'x'
    ];
    
    let move = ttt(board, 'x');
    expect(move).to.deep.equal({move: 2, ch: 'x'});
  });
  
  it('attacks from the side when opponent has opposite corner forks', () => {
    let board = [
      'o', null, null,
      null, 'x', null,
      null, null, 'o'
    ];    
    
    let moves = generateUniqueMoves(ttt, 20, board, 'x');
    expect(moves).to.have.members([1, 3, 5, 7]);
  });
  
  it('plays corner when opponent has more than 2 forks', () => {
    let board = [
      'o', null, null,
      null, 'x', null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(ttt, 10, board, 'o');
    expect(moves).to.have.members([2, 6]);
  });
  
  it('picks center when opponent has picked the first move', () => {
    let board = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = ttt(board, 'o');
    expect(move).to.deep.equal({move: 4, ch: 'o'});
  });
  
  it('mirrors an already picked corner if opponent has center', () => {
    let board = [
      'x', null, null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = ttt(board, 'x');
    expect(move).to.deep.equal({move: 8, ch: 'x'});
  });
  
  it('plays a random corner when the board is empty', () => {
    let board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let moves = generateUniqueMoves(ttt, 30, board, 'x');
    expect(moves).to.have.members([0, 2, 6, 8]);
  });
  
  it('selects corners of potential side wins', () => {
    let board = [
      null, 'o', null,
      null, null, null,
      null, null, 'x'
    ];
    
    let moves = generateUniqueMoves(ttt, 10, board, 'x');
    expect(moves).to.have.members([2, 6]);    
  });
  
  it('chooses a random side when nothing else is available', () => {
    let board = [
      'x', null, 'o',
      'o', null, 'x',
      'x', null, 'o'
    ];

    let moves = generateUniqueMoves(ttt, 10, board, 'x');
    expect(moves.sort()).to.eql([1, 7]);
  });

  it('selects the same side when nothing else is available while operating non-randomly', () => {
    let board = [
      'x', null, 'o',
      'o', null, 'x',
      'x', null, 'o'
    ];

    let moves = generateUniqueMoves(ttt, 10, board, 'x', false);
    expect(moves).to.eql([1]);
  });

  it('will pick moves randomly when level is set to zero (0)', () => {
    let board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];

    let moves = generateUniqueMoves(ttt, 100, board, 'x', true, 0);
    expect(moves.sort()).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('sets level to 0 when it is negative', () => {
    let board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];

    let moves = generateUniqueMoves(ttt, 100, board, 'x', true, -10);
    expect(moves.sort()).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('sets level to 10 when it is above 10', () => {
    let board = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let moves = generateUniqueMoves(ttt, 30, board, 'x', true, 20);
    expect(moves).to.have.members([0, 2, 6, 8]);
  });
});
