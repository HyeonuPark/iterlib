'use strict'

export const itersym = Symbol.iterator

export function isIterable (maybeIterable) {
  return typeof maybeIterable[itersym] === 'function'
}

export function getSelf () {
  return this
}

export function assertType (value, type, valueName) {
  const actualType = typeof value

  if (actualType !== type) {
    throw new Error(`Expected ${valueName} to ${type}, but got ${actualType}`)
  }
}
