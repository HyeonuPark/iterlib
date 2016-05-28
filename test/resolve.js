import {describe, it} from 'mocha'
import {expect} from 'chai'

import {resolve} from '../src/resolve'

describe('resolve()', () => {
  it('should return argument back when it\'s already iterable', () => {
    const arr = [4, 5, 6]
    const gen = (function * () { yield 6 })()
    const set = new Set([8, 9, 0])

    expect(resolve(arr)).to.equal(arr)
    expect(resolve(gen)).to.equal(gen)
    expect(resolve(set)).to.equal(set)
  })

  it('should treat null-ish value as a empty iterable', () => {
    expect([...resolve(null)]).to.lengthOf(0)
    expect([...resolve(void 0)]).to.lengthOf(0)
  })

  it('should treat non-iterable as a single element iterable', () => {
    const obj = {}
    const num = 42
    const yes = true

    expect([...resolve(obj)]).to.lengthOf(1).and.have.property(0, obj)
    expect([...resolve(num)]).to.lengthOf(1).and.have.property(0, num)
    expect([...resolve(yes)]).to.lengthOf(1).and.have.property(0, yes)
  })

  it('should automatically unwrap primitive wrappers', () => {
    const str = 'foobar'
    const num = 42
    const yes = true

    const STR = new String(str) // eslint-disable-line no-new-wrappers
    const NUM = new Number(num) // eslint-disable-line no-new-wrappers
    const YES = new Boolean(yes) // eslint-disable-line no-new-wrappers

    expect([...resolve(STR)]).to.lengthOf(1).and.have.property(0, str)
    expect([...resolve(NUM)]).to.lengthOf(1).and.have.property(0, num)
    expect([...resolve(YES)]).to.lengthOf(1).and.have.property(0, yes)
  })

  it('should treat string as a non-iterable', () => {
    const str = 'foobar'

    expect([...resolve(str)]).to.lengthOf(1).and.have.property(0, str)
  })

  it('should treat global object as a null value', () => {
    const GLOBAL = (function () { return this })()

    expect([...resolve(GLOBAL)]).to.lengthOf(0)
  })
})
