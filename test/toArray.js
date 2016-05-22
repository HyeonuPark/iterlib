import {expect} from 'chai'

import {toArray} from '../src/toArray'

describe('::toArray()', () => {
  it('should collect all iterated elements to array', () => {
    function* gen1 () {
      yield 3
      yield 4
      yield 5
    }

    function* gen2 () {
      yield* gen1()
      yield 6
      yield 7
    }

    expect(gen1()::toArray()).to.be.an('array')
      .and.lengthOf(3).and.deep.equal([3, 4, 5])
    expect(gen2()::toArray()).to.be.an('array')
      .and.lengthOf(5).and.deep.equal([3, 4, 5, 6, 7])
  })
})
