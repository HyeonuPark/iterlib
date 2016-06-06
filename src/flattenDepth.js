import {resolve} from './resolve'
import {flatten} from './flatten'
import {assertType} from './util'

export function flattenDepth (depth) {
  assertType(depth, 'number', '::flattenDepth() depth')

  if (depth < 1) {
    return resolve(this)
  }

  return this::flatten()::flattenDepth(depth - 1)
}
