import {describe, it} from 'mocha'
import {expect} from 'chai'

import {some} from '../src/some'

describe('::some()', () => {
  it('should return true when at least 1 element is passed the test', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const eq3 = elem => elem === 3
    const lte4 = elem => elem <= 4
    const gt4 = elem => elem > 4

    expect(gen()::some(eq3)).to.be.true
    expect(gen()::some(lte4)).to.be.true
    expect(gen()::some(gt4)).to.be.true
  })

  it('should return false when all elements are failed the test', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const lt3 = elem => elem < 3
    const gt5 = elem => elem > 5
    const lte2 = elem => elem <= 2

    expect(gen()::some(lt3)).to.be.false
    expect(gen()::some(gt5)).to.be.false
    expect(gen()::some(lte2)).to.be.false
  })

  it('should treat non-function test as a equality checker', () => {
    const obj = {}

    function * gen (arg) {
      yield arg
    }

    expect(gen(obj)::some(obj)).to.be.true
    expect(gen(42)::some(obj)).to.be.false
    expect(gen(42)::some(42)).to.be.true
  })
})
