import {describe, it} from 'mocha'
import {expect} from 'chai'

import {map} from '../src/map'

describe('::map()', () => {
  it('should iterate the results of calling callback with all element', () => {
    function * gen () {
      yield 3
      yield 4
      yield 5
    }

    const times2 = elem => elem * 2
    const plus2 = elem => elem + 2
    const div2 = elem => elem / 2

    expect([...gen()::map(times2)]).to.lengthOf(3).and.deep.equal([6, 8, 10])
    expect([...gen()::map(plus2)]).to.lengthOf(3).and.deep.equal([5, 6, 7])
    expect([...gen()::map(div2)]).to.lengthOf(3).and.deep.equal([1.5, 2, 2.5])
  })
})
