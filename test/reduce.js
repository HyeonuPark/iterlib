import {describe, it} from 'mocha'
import {expect} from 'chai'

import {reduce} from '../src/index'

describe('::reduce()', () => {
  it('should reduce iterable to value', () => {
    const result = [3, 4, 5]::reduce((prev, next) => prev + next)

    expect(result).to.equal(12)
  })

  it('should reduce iterable to value with base argument', () => {
    const result = [3, 4, 5]::reduce((prev, next) => prev + next, 10)

    expect(result).to.equal(22)
  })
})
