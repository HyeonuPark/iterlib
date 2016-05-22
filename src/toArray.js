import {resolve} from './resolve'
import {itersym} from './util'

export function toArray () {
  const iterator = resolve(this)[itersym]()
  const result = []
  let {done, value} = iterator.next()

  while (!done) {
    result.push(value)
    ;({done, value} = iterator.next())
  }

  return result
}
