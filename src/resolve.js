import {doneTrue, emptyIterable, itersym, isIterable} from './util'

function singleIterable (element) {
  let done = false

  return {
    [itersym] () {
      return this
    },
    next () {
      if (done) {
        return doneTrue
      }
      done = true
      return {done: false, value: element}
    }
  }
}

const GLOBAL = (function () { return this })()

function unwrap (maybeWrapper) {
  const {constructor} = maybeWrapper

  if (
    constructor === String ||
    constructor === Number ||
    constructor === Boolean
  ) {
    return maybeWrapper.valueOf()
  }

  return maybeWrapper
}

export function resolve (value) {
  if (value === GLOBAL || value == null) {
    return emptyIterable
  }

  const maybeIterable = unwrap(value)

  if (typeof maybeIterable === 'string') {
    return singleIterable(maybeIterable)
  }
  if (isIterable(maybeIterable)) {
    return maybeIterable
  }
  return singleIterable(maybeIterable)
}
