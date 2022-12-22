import _        from 'lodash';
import {expect} from 'chai';
import {ttt}    from '../src';

describe('two-player game simulation', () => {
  it('plays perfect player to beat lower-level player and to draw perfect players', () => {
    let results = {
      o: {},
      x: {}
    };
    let even = _.partial(ttt, _, 'x');
    
    for(let level = 0; level < 11; level++) {
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

    expect(results.x[0].wins).to.be.above(results.o[0].wins);
    expect(results.x[5].wins).to.be.above(results.o[5].wins);
    expect(results.x[10].wins).to.equal(0);
    expect(results.o[10].wins).to.equal(0);
  });
});
