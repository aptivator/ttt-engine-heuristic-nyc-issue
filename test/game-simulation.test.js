import _        from 'lodash';
import {expect} from 'chai';
import {ttt}    from '../src';

describe('two-player game simulation', () => {
  it('plays', () => {
    let board = [
      null, 'x', null,
      null, null, null,
      null, null, 'o'
    ];
    
    let {move} = ttt(board, 'o');
    console.log(move);
  }), 
  
  it('perfect player beats lower-level player and perfect players draw', () => {
    let results = {
      o: {},
      x: {}
    };
    let even = _.partial(ttt, _, 'x');
    
    for(let level = 1; level < 10; level++) {
      let odd = _.partial(ttt, _, 'o', true, level);
      
      results.x[level] = {wins: 0};
      results.o[level] = {wins: 0};
      
      for(let game = 0; game < 200; game++) {
        let grid = [
          null, null, null,
          null, null, null,
          null, null, null
        ];
        
        for(let i = 1;; i++) {
          let player = i % 2 === 0 ? even : odd;
          var {move, ch, win, draw} = player(grid);
          
          if(draw) {
            break;
          }
          
          if(win) {
            results[ch][level].wins++;
            break;
          }
          
          grid[move] = ch;
        }
      }
    }
    
    console.log(results);
    
    expect(results.x[1].wins).to.be.above(results.o[1].wins);
    expect(results.x[8].wins).to.equal(0);
    expect(results.o[8].wins).to.equal(0);
  });
});
