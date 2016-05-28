import {assertType, itersym, freeze, doneTrue} from './util'

export function range (start, end, step = 1) {
  if (end === void 0) {
    end = start
    start = 0
  }

  assertType(start, 'number', 'range() argument')
  assertType(end, 'number', 'range() argument')
  assertType(step, 'number', 'range() argument')

  const descending = step < 0

  return freeze({
    start,
    end,
    step,
    [itersym] () {
      let value = start - step
      let isDone = false

      return freeze({
        next () {
          if (isDone) {
            return doneTrue
          }

          value += step

          if (descending ? value <= end : value >= end) {
            isDone = true
            return {done: true, value}
          }

          return {done: false, value}
        }
      })
    }
  })
}
