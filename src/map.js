import {resolve} from './resolve'
import {assertType, itersym, getSelf, forwardReturn} from './util'

export function map (callback) {
  assertType(callback, 'function', '::map() callback')

  const iterator = resolve(this)[itersym]()
  let isDone = false

  return {
    [itersym]: getSelf,
    return: forwardReturn(iterator),
    next () {
      if (isDone) {
        return {done: true}
      }

      const {done, value} = iterator.next()

      if (done) {
        isDone = true
      }

      return {done, value: callback(value)}
    }
  }
}
