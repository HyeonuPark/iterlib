import {describe, it} from 'mocha'
import {expect} from 'chai'

import {compact} from '../src/index'

describe('::compact()', () => {
  it('should filter falsey values', () => {
    const array = ['0', '1', '2']
    const falsey = [null, undefined, false, 0, NaN, '']

    expect([...array.concat(falsey)::compact()]).to.deep.equal(array)
    expect([...falsey.concat(array)::compact()]).to.deep.equal(array)
  })
})
