iterlib
========

Array#map and similars for all [iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), with [function-bind syntax](https://github.com/zenparsing/es-function-bind#examples)

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

## Pipeline virtual methods

Virtual methods that generate another iterator

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

## Reducer virtual method

Virtual methods that reduce iterable to value

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

# Milestone

## Original helper functions

- [x] resolve
- [x] range
- [x] toArray
- [x] product

## Original methods

- [ ] indexed

## Methods in `Array`

- [ ] concat
- [x] every
- [x] filter
- [ ] find
- [ ] forEach
- [ ] includes
- [x] map
- [ ] reduce
- [x] some

## Utilities in lodash

- [ ] chunk
- [ ] compact
- [ ] drop
- [ ] dropWhile
- [ ] flatten
- [ ] flattenDeep
- [ ] flattenDepth
- [ ] head
- [ ] take
- [ ] takeWhile
- [ ] flatMap
