import {resolve} from './resolve'
import {assertType, itersym} from './util'

export function reduce (reducer, base) {
  assertType(reducer, 'function', '::reduce() reducer')

  const iterator = resolve(this)[itersym]()

  let result = base
  if (base == null) {
    const {done, value} = iterator.next()

    if (done) {
      return result
    }

    result = value
  }

  let {done, value} = iterator.next()
  while (!done) {
    result = reducer(result, value)
    ;({done, value} = iterator.next())
  }

  return result
}
