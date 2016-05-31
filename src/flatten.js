import {resolve} from './resolve'

// TODO: implement without generator
export function * flatten () {
  for (let elem of resolve(this)) {
    yield * resolve(elem)
  }
}
