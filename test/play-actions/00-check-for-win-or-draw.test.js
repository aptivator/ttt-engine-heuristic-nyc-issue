import {expect}            from 'chai';
import {checkForWinOrDraw} from '../../src/play-actions/00-check-for-win-or-draw';

describe('hasWinOrDraw() play action', () => {
  it('finds a win', () => {
    let grid = [
      'x', 'x', 'x',
      null, null, null,
      null, null, null
    ];
    
    let check = checkForWinOrDraw(grid, 'x');
    expect(check).to.deep.equal({ch: 'x', win: [0, 1, 2]});
  });  
  
  it(`finds an opponent's win`, () => {
    let grid = [
      'x', 'o', 'x',
      null, 'o', 'x',
      null, 'o', null
    ];
    
    let check = checkForWinOrDraw(grid, 'x');
    expect(check).to.deep.equal({ch: 'o', win: [1, 4, 7]});
  });
  
  it('checks for a win first before checking for a draw', () => {
    let grid = [
      'x', 'x', 'o',
      'x', 'o', 'x',
      'x', 'o', 'o'
    ];
    
    let check = checkForWinOrDraw(grid, 'x');
    expect(check).to.deep.equal({ch: 'x', win: [0, 3, 6]});
  });
  
  it('diagnoses a draw', () => {
    let grid = [
      'x', 'o', 'x',
      'o', 'x', 'o',
      'o', 'x', 'o'
    ];
    
    let check = checkForWinOrDraw(grid, 'x');
    expect(check).to.deep.equal({draw: true});
  });
  
  it('returns undefined when there is no win or draw', () => {
    let grid = [
      'x', 'x', 'o',
      null, null, 'o',
      null, null, 'x'
    ];
    
    let result = checkForWinOrDraw(grid, 'x');
    expect(result).to.equal(undefined);
  });
});
