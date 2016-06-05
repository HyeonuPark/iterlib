import {resolve} from './resolve'
import {itersym, getSelf, forwardReturn} from './util'

export function indexed () {
  const iterator = resolve(this)[itersym]()
  let isDone = false
  let index = -1

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

      index += 1
      return {done, value: {index, value}}
    }
  }
}
