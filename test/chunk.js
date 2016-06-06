import {describe, it} from 'mocha'
import {expect} from 'chai'

import {chunk} from '../src/index'

describe('::chunk()', () => {
  it('should yield arrays of elements with given size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect([...array::chunk(3)]).to.deep.equal([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])

    expect([...array::chunk(4)]).to.deep.equal([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9]
    ])
  })
})
