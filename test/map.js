import {describe, it} from 'mocha'
import {expect} from 'chai'
import {spy} from 'sinon'

import {map} from '../src/index'

describe('::map()', () => {
  it('should iterate the results of calling callback with all element', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const times2 = spy(elem => elem * 2)
    const plus2 = spy(elem => elem + 2)
    const div2 = spy(elem => elem / 2)

    expect([...gen()::map(times2)]).to.lengthOf(3).and.deep.equal([6, 8, 10])
    expect([...gen()::map(plus2)]).to.lengthOf(3).and.deep.equal([5, 6, 7])
    expect([...gen()::map(div2)]).to.lengthOf(3).and.deep.equal([1.5, 2, 2.5])

    expect(times2.callCount).to.equal(3)
    expect(plus2.callCount).to.equal(3)
    expect(div2.callCount).to.equal(3)

    expect(times2.neverCalledWith(undefined)).to.be.true
    expect(plus2.neverCalledWith(undefined)).to.be.true
    expect(div2.neverCalledWith(undefined)).to.be.true
  })
})
