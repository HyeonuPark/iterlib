import {describe, it} from 'mocha'
import {expect} from 'chai'

import {flattenDepth} from '../src/index'

describe('::flattenDep()', () => {
  const array = [1, [2, [3, [4]], 5]]

  it('should flatten iterable until given depth', () => {
    expect([...array::flattenDepth(1)]).to.deep.equal([1, 2, [3, [4]], 5])
    expect([...array::flattenDepth(2)]).to.deep.equal([1, 2, 3, [4], 5])
    expect([...array::flattenDepth(3)]).to.deep.equal([1, 2, 3, 4, 5])
  })

  it('should treat depth of < 1 as no-operation', () => {
    expect([...array::flattenDepth(0)]).to.deep.equal(array)
    expect([...array::flattenDepth(-1)]).to.deep.equal(array)
    expect([...array::flattenDepth(0.5)]).to.deep.equal(array)
  })
})
