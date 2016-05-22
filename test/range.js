import {expect} from 'chai'

import {range} from '../src/range'

describe('range()', () => {
  it('should iterate integers from start to end-1', () => {
    expect([...range(2, 5)]).to.lengthOf(3).and.deep.equal([2, 3, 4])
    expect([...range(5, 9)]).to.lengthOf(4).and.deep.equal([5, 6, 7, 8])
  })

  it('should set start to 0 when only single argument is provided', () => {
    expect([...range(3)]).to.lengthOf(3).and.deep.equal([0, 1, 2])
    expect([...range(5)]).to.lengthOf(5).and.deep.equal([0, 1, 2, 3, 4])
  })

  it('should use given step value when provided', () => {
    expect([...range(3, 0, -1)]).to.lengthOf(3).and.deep.equal([3, 2, 1])
    expect([...range(30, 100, 30)]).to.lengthOf(3).and.deep.equal([30, 60, 90])
  })
})
