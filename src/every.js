import {resolve} from './resolve'
import {itersym} from './util'

export function every (maybeTest) {
  const test = typeof maybeTest === 'function'
    ? maybeTest
    : arg => arg === maybeTest

  const iterator = resolve(this)[itersym]()
  let {done, value} = iterator.next()

  while (!done) {
    if (!test(value)) {
      if (typeof iterator.return === 'function') {
        iterator.return()
      }
      return false
    }

    ;({done, value} = iterator.next())
  }

  return true
}
