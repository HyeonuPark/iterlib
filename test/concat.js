import {describe, it} from 'mocha'
import {expect} from 'chai'

import {concat} from '../src/concat'

describe('::concat()', () => {
  it('should iterate all elements from this and given iterables', () => {
    expect([...[3, 4]::concat([5], [6, 7, 8])])
      .to.lengthOf(6)
      .and.deep.equal([3, 4, 5, 6, 7, 8])
  })

  it('should resolve() all elements', () => {
    expect([...[3, 4]::concat(5, null, 'foo', false, 0)])
      .to.lengthOf(6)
      .and.deep.equal([3, 4, 5, 'foo', false, 0])
  })
})
