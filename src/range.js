import {assertType, itersym, getSelf} from './util'

export function range (start, end, step = 1) {
  if (end === void 0) {
    end = start
    start = 0
  }

  assertType(start, 'number', 'range() argument')
  assertType(end, 'number', 'range() argument')
  assertType(step, 'number', 'range() argument')

  const descending = step < 0
  let value = start - step
  let isDone = false

  return {
    [itersym]: getSelf,
    next () {
      if (isDone) {
        return {done: true}
      }

      value += step

      if (descending ? value <= end : value >= end) {
        isDone = true
        return {done: true, value}
      }

      return {done: false, value}
    }
  }
}
