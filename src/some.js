import {itersym} from './util'
import {resolve} from './resolve'

export function some (maybeTest) {
  const test = typeof maybeTest === 'function'
    ? maybeTest
    : arg => arg === maybeTest

  const iterator = resolve(this)[itersym]()
  let {done, value} = iterator.next()

  while (!done) {
    if (test(value)) {
      if (typeof iterator.return === 'function') {
        iterator.return()
      }
      return true
    }

    ;({done, value} = iterator.next())
  }

  return false
}
