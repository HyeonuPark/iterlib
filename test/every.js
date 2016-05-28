import {describe, it} from 'mocha'
import {expect} from 'chai'

import {every} from '../src/every'

describe('::every()', () => {
  it('should return false when at least 1 element is failed the test', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const eq3 = elem => elem === 3
    const lte4 = elem => elem <= 4
    const lt3 = elem => elem < 3

    expect(gen()::every(eq3)).to.be.false
    expect(gen()::every(lte4)).to.be.false
    expect(gen()::every(lt3)).to.be.false
  })

  it('should return true when all elements are passed the test', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const lt6 = elem => elem < 6
    const gt1 = elem => elem > 1
    const lte5 = elem => elem <= 5

    expect(gen()::every(lt6)).to.be.true
    expect(gen()::every(gt1)).to.be.true
    expect(gen()::every(lte5)).to.be.true
  })

  it('should treat non-function test as a equality checker', () => {
    const obj = {}

    function * gen (arg) {
      yield arg
    }

    expect(gen(obj)::every(obj)).to.be.true
    expect(gen(42)::every(obj)).to.be.false
    expect(gen(42)::every(42)).to.be.true
  })
})
