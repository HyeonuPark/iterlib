import {resolve} from './resolve'
import {itersym} from './util'

export function find (maybeTest) {
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
      return value
    }

    ;({done, value} = iterator.next())
  }
}
