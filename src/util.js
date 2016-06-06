export const itersym = Symbol.iterator

export function isIterable (maybeIterable) {
  return typeof maybeIterable[itersym] === 'function'
}

export function getSelf () {
  return this
}

export const freeze = Object.freeze

export const doneTrue = freeze({done: true})

export const emptyIterable = freeze({
  [itersym] () {
    return this
  },
  next () {
    return doneTrue
  }
})

export function assertType (value, type, valueName) {
  const actualType = typeof value

  if (actualType !== type) {
    throw new Error(`Expected ${valueName} to ${type}, but got ${actualType}`)
  }
}

export function forwardReturn (iterator) {
  return arg => {
    if (iterator && typeof iterator.return === 'function') {
      return iterator.return(arg)
    }
    return arg
  }
}
