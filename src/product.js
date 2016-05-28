import {map} from './map'

// TODO: implement without generator
export function * product (...iterables) {
  if (iterables.length === 0) {
    return
  }

  if (iterables.length === 1) {
    yield * iterables[0]::map(elem => [elem])
    return
  }

  for (let elem of iterables[0]) {
    for (let subset of product(...iterables.slice(1))) {
      subset.unshift(elem)
      yield subset
    }
  }
}
