import {map} from './map'
import {flatten} from './flatten'

export function flatMap (callback) {
  return this::map(callback)::flatten()
}
