import {resolve} from './resolve'
import {map} from './map'
import {itersym, freeze, getSelf, doneTrue} from './util'

export function product (...iterables) {
  if (iterables.length === 0) {
    return
  }

  if (iterables.length === 1) {
    return iterables[0]::map(elem => [elem])
  }

  const tailIterables = iterables.slice(1)

  const iterator = resolve(iterables[0])[itersym]()
  let head = null
  let headDone = false
  let tail = null
  let tailDone = true

  return freeze({
    [itersym]: getSelf,
    next () {
      if (headDone) {
        return doneTrue
      }

      if (tailDone) {
        const {done, value} = iterator.next()

        if (done) {
          headDone = true
          return doneTrue
        }

        head = value
        tail = product(...tailIterables)
        tailDone = false
      }

      const result = tail.next()

      if (result.done) {
        tailDone = true
        return this.next()
      }

      result.value.unshift(head)
      return result
    },
    return (arg) {
      if (headDone) {
        return arg
      }

      if (tail) {
        tail.return(arg)
      }

      if (iterator && typeof iterator.return === 'function') {
        return iterator.return(arg)
      }

      return arg
    }
  })
}
