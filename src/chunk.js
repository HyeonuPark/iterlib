import {resolve} from './resolve'
import {assertType, itersym, getSelf, doneTrue} from './util'

export function chunk (size) {
  assertType(size, 'number', '::chunk() size')

  const iterator = resolve(this)[itersym]()

  let isDone = false

  return {
    [itersym]: getSelf,
    return (returnValue) {
      return typeof iterator.return === 'function'
        ? iterator.return(returnValue)
        : returnValue
    },
    next () {
      if (isDone) {
        return doneTrue
      }

      let done = false
      let value = null
      const cache = []

      while (!done && cache.length < size) {
        ;({done, value} = iterator.next())

        if (!done) {
          cache.push(value)
        }
      }

      if (done) {
        isDone = true
      }

      if (cache.length === 0) {
        return doneTrue
      }

      return {done: false, value: cache}
    }
  }
}
