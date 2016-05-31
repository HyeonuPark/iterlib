import {describe, it} from 'mocha'
import {expect} from 'chai'

import {flatten} from '../src/flatten'

describe('::flatten()', () => {
  it('should iterate elements of elements of given iterator', () => {
    expect([...[[3, 4], [5], [6, 7, 8]]::flatten()])
      .to.lengthOf(6)
      .and.deep.equal([3, 4, 5, 6, 7, 8])
  })

  it('should resolve() all elements', () => {
    expect([...[[3, 4], 5, null, 'foo', false, 0]::flatten()])
      .to.lengthOf(6)
      .and.deep.equal([3, 4, 5, 'foo', false, 0])
  })
})
