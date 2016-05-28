import {describe, it} from 'mocha'
import {expect} from 'chai'

import {indexed} from '../src/indexed'

describe('::indexed()', () => {
  it('should iterate elements with index', () => {
    const result = ['a', 'b', 'c', 'd', 'e']::indexed()

    expect([...result]).to.lengthOf(5).and.deep.equal([
      {index: 0, value: 'a'},
      {index: 1, value: 'b'},
      {index: 2, value: 'c'},
      {index: 3, value: 'd'},
      {index: 4, value: 'e'}
    ])
  })
})
