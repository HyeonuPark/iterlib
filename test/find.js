import {describe, it} from 'mocha'
import {expect} from 'chai'

import {find} from '../src/index'

describe('::find()', () => {
  it('should find the first matching element and return it', () => {
    const array = [1, 2, 3, 4, 5, 6, 7]

    expect(array::find(el => el > 5)).to.equal(6)
  })
})
