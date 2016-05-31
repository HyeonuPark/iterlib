import {describe, it} from 'mocha'
import {expect} from 'chai'

import {flatMap} from '../src/flatMap'

describe('::flatMap()', () => {
  it('should have same effect as itr::map()::flatten()', () => {
    const result = [3, 4, 5]::flatMap(elem => {
      return elem % 2
        ? [elem, elem]
        : null
    })

    expect([...result]).to.lengthOf(4).and.deep.equal([3, 3, 5, 5])
  })
})
