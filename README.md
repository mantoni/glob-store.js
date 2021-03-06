# glob-store.js

[![Build Status]](https://travis-ci.org/mantoni/glob-store.js)
[![SemVer]](http://semver.org)
[![License]](https://github.com/mantoni/glob-store.js/blob/master/LICENSE)

Key-value store with iterator and glob semantics. Allows to store multiple
values per key and can be modified during iteration.

## Install with npm

```
npm install glob-store
```

## Browser compatibility

To use this module in a browser, download the npm package and then use
[Browserify](http://browserify.org) to create a standalone version.

## Usage

```js
var Store = require('glob-store').Store;

var s = new Store();
s.add('**', 1);
s.add('a.b', 2);
s.add('a.c', 3);
s.add('a.c', 7);

var c, i = s.iterator('a.*');
while ((c = i.next()) !== undefined) {
  console.log(i.name + ': ' + c);
}
```

The implementation is based on [glob-tree][], but allows multiple values to be
stored under the same key.

## API

- `Store([opts])`: Constructor function, accepting these options:
    - `reverse`: Whether to store the values in reverse insertion order.
      Defaults to `false`.

## Store API

- `add(name, value)`
- `remove(name, value)`
- `removeAll([name])`
- `iterator(name[, options])`
- `values([name])`

The iterator is derived from [min-iterator][] and supports the same `options`
as the [glob-tree][] iterator:

- `matchers`: whether to include matchers, defaults to `true`
- `onlyMatchers`: whether to only include matchers, defaults to `false`

## License

MIT

[Build Status]: http://img.shields.io/travis/mantoni/glob-store.js.svg
[SemVer]: http://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[License]: http://img.shields.io/npm/l/glob-store.svg
[min-iterator]: https://github.com/mantoni/min-iterator.js
[glob-tree]: https://github.com/mantoni/glob-tree.js
