iterlib
========

Array#map and similars for all [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), with [function-bind syntax](https://github.com/zenparsing/es-function-bind#examples)

- [![Build Status](https://travis-ci.org/HyeonuPark/iterlib.svg?branch=master)](https://travis-ci.org/HyeonuPark/iterlib) [![codecov](https://codecov.io/gh/HyeonuPark/iterlib/branch/master/graph/badge.svg)](https://codecov.io/gh/HyeonuPark/iterlib) - master

- [![Build Status](https://travis-ci.org/HyeonuPark/iterlib.svg?branch=dev)](https://travis-ci.org/HyeonuPark/iterlib) [![codecov](https://codecov.io/gh/HyeonuPark/iterlib/branch/dev/graph/badge.svg)](https://codecov.io/gh/HyeonuPark/iterlib) - dev

# Reference

## Static functions

Some utility functions that returns iterator

### resolve()

Normalize given argument to iterable

All methods below are call it to normalize this-arg

#### Rule

- `resolve(null)`/`resolve(undefined)` -> return empty iterable

- `resolve(string)` -> return single element iterable

- `resolve(iterable)` -> return itself

- `resolve(global)` -> return empty iterable

- `resolve(else)` -> return single element iterable

#### Usage

```js
import {resolve} from 'iterlib'

const data = getStringOrArrayOfString()

for (let str of resolve(data)) {
  handle(str)
}
```

### range()

Iterate from start to end number, just like [python3 `range()`](https://docs.python.org/3/library/stdtypes.html#ranges)

#### Rule

- `range(num)` -> iterate from `0` to `num - 1`

- `range(start, end)` -> iterate from `start` to `end - 1`

- `range(start, end, step)` -> iterate from `start` to `end` with interval `step`

#### Usage

```js
import {range} from 'iterlib'

const arr1 = [...range(3)] // [0, 1, 2]

const arr2 = [...range(2, 5)] // [2, 3, 4]

const arr3 = [...range(1, 7, 2)] // [1, 3, 5]

const arr4 = [...range(4, 1, -1)] // [4, 3, 2]
```

### product()

#### Rule

- `product(...iterables)` -> iterate all possible sets of given iterables' elements

#### Usage

```js
import {product, range} from 'iterlib'

for (let [x, y, z] of product(range(1), range(2), range(3))) {
  console.log(`(${x}, ${y}, ${z})`)
}

// result:
// (0, 0, 0)
// (0, 0, 1)
// (0, 0, 2)
// (0, 1, 0)
// (0, 1, 1)
// (0, 1, 2)
```

## Pipeline virtual methods

Virtual methods that generate another iterator

### ::concat()

Just like `Array#concat`

#### Rule

- `iterable::concat(...otherIterables)`

#### Usage

```js
import {concat} from 'iterlib'

console.log([...new Set([3, 4])::concat([5, 6], [7, 8])])

// result: [3, 4, 5, 6, 7, 8]
```

### ::filter()

Just like `Array#filter`

#### Rule

- `iterable::filter(callback)`

#### Usage

```js
import {filter} from 'iterlib'

function onlyString () {
  return arguments::filter(arg => typeof arg === 'string')
}

[...onlyString(3, 'a', true, 'b')] // ['a', 'b']
```

### ::flatMap()

Allow multiple replacement to ::map(), same as ::map()::flatten()

#### Rule

- `iterable::flatMap(callback)`

#### Usage

```js
import {flatMap} from 'iterlib'

const list = [1, 3, 6, 2, 4]

function mapper (num) {
  if (num < 1 || num > 3) {
    return null
  }

  switch (num) {
    case 1: return [1]
    case 2: return [1, 2]
    case 3: return [1, 2, 3]
  }
}

console.log([...list.flatMap(mapper)])

// result: [1, 1, 2, 3, 1, 2]
```

### ::flatten()

Flatten nested iterable

#### Rule

- `iterable::flatten()`

#### Usage

```js
import {flatten} from 'iterlib'

const list = [
  ['a', 'b', 'c'],
  42,
  null,
  [true, false]
]

console.log([...list::flatten()])

// result: ['a', 'b', 'c', 42, true, false]
```

### ::indexed()

Iterate elements with index number

#### Rule

- `iterable::indexed()`

#### Usage

```js
import {indexed} from 'iterlib'

function withIndex () {
  return arguments::indexed()
}

for (let {index, value} of withIndex('foo', 'bar', 'baz')) {
  console.log(`${index} - ${value}`)
}

// result:
// 0 - foo
// 1 - bar
// 2 - baz
```

### ::map()

Just like `Array#map`

#### Rule

- `iterable::map(callback)`

#### Usage

```js
import {map} from 'iterlib'

function duplicate () {
  return arguments::map(arg => 2 * arg)
}

[...duplicate(3, 4, 5)] // [6, 8, 10]
```

## Reducer virtual method

Virtual methods that reduce iterable to value

### ::every()

Just like `Array#every`

#### Rule

- `iterable::every(callback)` -> true if every elements are passed the callback, otherwise false

#### Usage

```js
import {every} from 'iterlib'

function allFOO () {
  return arguments::every(arg => arg === 'FOO')
}

allFOO('FOO', 'FOO', 'FOO') // true
allFOO('FOO', 'Foo', 'foo') // false
```

### ::reduce()

Just like `Array#reduce`

#### Rule

- `iterable::reduce(reducer[, initValue])`

#### Usage

```js
import {reduce} from 'iterlib'

const names = new Set(['Andrew', 'Anthony', 'Ada'])

console.log(names::reduce((prev, next) => `${prev}, ${next}`))

// result: Andrew, Anthony, Ada
```

### ::some()

Just like `Array#some`

#### Rule

- `iterable::some(callback)` -> false if every elements are failed the callback, otherwise true

#### Usage

```js
import {some} from 'iterlib'

function hasFOO () {
  return arguments::some(arg => arg === 'FOO')
}

hasFOO('FOO', 'Foo', 'foo') // true
hasFOO('FOo', 'FoO', 'fOO') // false
```

### ::toArray()

Just like `[...itr]`, but as a method form

#### Rule

- `iterable::toArray()` -> collect all iterated elements to array

#### Usage

```js
import {toArray} from 'iterlib'

function wrapArray () {
  return arguments::toArray()
}

wrapArray(3, 4, 5) // [3, 4, 5]
```

# Milestone

## Original helper functions

- [x] resolve
- [x] range
- [x] product

## Original methods

- [x] indexed
- [x] toArray

## Methods in `Array`

- [x] concat
- [x] every
- [x] filter
- [ ] find
- [x] map
- [x] reduce
- [x] some

## Utilities in lodash

- [ ] chunk
- [x] compact
- [ ] drop
- [ ] dropWhile
- [x] flatten
- [ ] flattenDepth
- [ ] head
- [ ] take
- [ ] takeWhile
- [x] flatMap
