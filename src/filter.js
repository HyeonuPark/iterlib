import {resolve} from './resolve'
import {assertType, itersym, getSelf} from './util'

export function filter (callback) {
  assertType(callback, 'function', '::filter() callback')

  const iterator = resolve(this)[itersym]()
  let isDone = false

  return {
    [itersym]: getSelf,
    return (returnValue)  {
      return typeof iterator.return === 'function'
        ? iterator.return(returnValue)
        : returnValue
    },
    next () {
      if (isDone) {
        return {done: true}
      }

      let {done, value} = iterator.next()

      while (!done && !callback(value)) {
        ;({done, value} = iterator.next())
      }

      if (done) {
        isDone = true
      }

      return {done, value}
    }
  }
}
