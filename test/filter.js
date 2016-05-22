import {expect} from 'chai'

import {filter} from '../src/filter'

describe('::filter()', () => {
  it('should only iterate the elements that passed the test', () => {
    function* gen () {
      yield 3
      yield 4
      yield 5
    }

    const odd = elem => elem % 2 === 1
    const lt5 = elem => elem < 5
    const div6 = elem => 6 % elem === 0

    expect([...gen()::filter(odd)]).to.lengthOf(2).and.deep.equal([3, 5])
    expect([...gen()::filter(lt5)]).to.lengthOf(2).and.deep.equal([3, 4])
    expect([...gen()::filter(div6)]).to.lengthOf(1).and.deep.equal([3])
  })
})
