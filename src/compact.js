import {filter} from './filter'

function getArg (arg) {
  return arg
}

export function compact () {
  return this::filter(getArg)
}
