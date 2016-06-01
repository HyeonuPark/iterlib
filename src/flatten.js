import {resolve} from './resolve'
import {itersym, freeze, getSelf, doneTrue} from './util'

export function flatten () {
  const container = resolve(this)[itersym]()
  let containerDone = false
  let iterator = null
  let iteratorDone = true

  return freeze({
    [itersym]: getSelf,
    next () {
      if (containerDone) {
        return doneTrue
      }

      if (iteratorDone) {
        const {done, value} = container.next()

        if (done) {
          containerDone = true
          iterator = null
          return doneTrue
        }

        iterator = resolve(value)[itersym]()
        iteratorDone = false
      }

      const result = iterator.next()

      if (result.done) {
        iteratorDone = true
        return this.next()
      }

      return result
    },
    return (arg) {
      if (iterator && typeof iterator.return === 'function') {
        return iterator.return(arg)
      }
      return arg
    }
  })
}
