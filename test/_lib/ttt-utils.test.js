import {expect}              from 'chai';
import tttUtils              from '../../src/_lib/ttt-utils';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('tic-tac-toe utilities library', () => {
  it('finds blank cells', () => {
    let grid = [
      null, null, 'x',
      'o', 'x', 'o',
      'o', null, null
    ];
    
    let blanks = tttUtils.blanks(grid);
    expect(blanks).to.have.members([0, 1, 7, 8]);
  });
  
  it('fetches random corner moves that could allow for a win', () => {
    let grid = [
      'x', 'o', null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = tttUtils.findMoveByType(grid, 'x', 'corners', true);
    expect(move).to.equal(6);
  });
  
  it('fetches random a corner move when there is no win', () => {
    let grid = [
      'x', 'o', null,
      'o', null, null,
      null, 'x', 'o'
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'corners', true);
    expect(moves).to.have.members([2, 6]);
  });

  it('fetches the same corner move when there is no win', () => {
    let grid = [
      'x', 'o', null,
      'o', null, null,
      null, 'x', 'o'
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'corners', false);
    expect(moves).to.deep.equal([2]);
  });
  
  it('gets a random side move that could allow for a win', () => {
    let grid = [
      null, null, 'x',
      null, 'o', null,
      null, null, null
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'sides', true);
    expect(moves).to.have.members([1, 5]);
  });
  
  it('finds a side move when when there is no win', () => {
    let grid = [
      'x', null, 'o',
      'o', null, 'x',
      'x', null, 'o'
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'sides', true);
    expect(moves).to.have.members([1, 7]);
  });
  
  it('picks the same side move', () => {
    let grid = [
      'x', null, 'o',
      'o', null, 'x',
      'x', null, 'o'
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'sides', false);
    expect(moves).to.deep.equal([1]);    
  });
  
  it('selects only corner moves or a potential side win', () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, 'o', null
    ];
    
    let findMoveByType = tttUtils.findMoveByType.bind(tttUtils);
    let moves = generateUniqueMoves(findMoveByType, grid, 'x', 'corners', true, true);
    expect(moves).to.have.members([2, 6]);
  });
  
  it('determines blank intersections among one-move potentials', () => {
    let grid = [
      'o', null, null,
      null, 'x', null,
      null, null, 'x'
    ];
    
    let intersections = tttUtils.intersections(grid, 'x');
    expect(intersections).to.have.members([2, 5, 6, 7]);
  });
  
  it('normalizes grid into an array if a grid is a string', () => {
    let grid = 'xo       ';
    let gridArr = ['x', 'o', null, null, null, null, null, null, null];
    
    grid = tttUtils.normalizeGrid(grid);
    expect(grid).to.deep.equal(gridArr);
    let _gridArr = tttUtils.normalizeGrid(gridArr);
    expect(_gridArr).to.equal(gridArr);
  });
  
  it('assembles potential wins', () => {
    let grid = [
      'x', 'o', null,
      null, 'o', null,
      null, 'x', null
    ];
    
    let potentials = tttUtils.potentials(grid, 'x', 1);
    expect(potentials).to.deep.equal([
      {blanks: [3, 6], taken: [0], cells: [0, 3, 6], side: true},
      {blanks: [6, 8], taken: [7], cells: [6, 7, 8], side: true}
    ]);
  });
});
