import {flatten} from './flatten'

export function concat (...tails) {
  return [this, ...tails]::flatten()
}
