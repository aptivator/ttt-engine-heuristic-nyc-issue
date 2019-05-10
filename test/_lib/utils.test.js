import {expect}              from 'chai';
import utils                 from '../../src/_lib/utils';
import {generateUniqueMoves} from '../__test-utils/generate-unique-moves';

describe('general utilities library', () => {
  it('fetches an array element randomly', () => {
    let arr = [1, 2, 3, 4, 5];
    let picks = generateUniqueMoves(utils.pickRandom, arr);
    expect(picks).to.have.members(arr);
  });
});
