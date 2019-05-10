import {expect}             from 'chai';
import {playOppositeCorner} from '../../src/play-actions/05-play-opposite-corner';

describe('playOppositeCorner() play action', () => {
  it('plays opposite of picked corner when opponent is in the center', () => {
    let grid = [
      'x', null, null,
      null, 'o', null,
      null, null, null
    ];
    
    let move = playOppositeCorner(grid, 'x');
    expect(move).to.equal(8);
    
    grid = [
      null, null, null,
      null, 'o', null,
      'x', null, null    
    ];
    
    move = playOppositeCorner(grid, 'x');
    expect(move).to.equal(2);
  });
  
  it('returns undefined when opposite corner cannot be filled', () => {
    let grid = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = playOppositeCorner(grid, 'x');
    expect(move).to.equal(undefined);
  });
});
