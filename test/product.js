import {describe, it} from 'mocha'
import {expect} from 'chai'

import {product} from '../src/product'

describe('::product()', () => {
  it('should iterate all possible sets of given iterables', () => {
    const result = product(['a', 'b', 'c'], ['d', 'e'], 'f')

    expect([...result]).to.lengthOf(6).and.deep.equal([
      ['a', 'd', 'f'],
      ['a', 'e', 'f'],
      ['b', 'd', 'f'],
      ['b', 'e', 'f'],
      ['c', 'd', 'f'],
      ['c', 'e', 'f']
    ])
  })

  it('should call [Symbol.iterator]() per every iteration', () => {
    const iter = {
      start: 0,
      * [Symbol.iterator] () {
        const {start} = this
        yield start
        yield start + 1
        this.start = start + 2
      }
    }

    const result = product(['a', 'b', 'c'], iter)

    expect([...result]).to.lengthOf(6).and.deep.equal([
      ['a', 0],
      ['a', 1],
      ['b', 2],
      ['b', 3],
      ['c', 4],
      ['c', 5]
    ])
  })
})
