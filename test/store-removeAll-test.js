/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it, before, after, beforeEach, afterEach*/
'use strict';

var assert = require('assert');

var Store = require('../lib/store').Store;


describe('store.removeAll', function () {

  it('remove value', function () {
    var s = new Store();
    s.add('a.b', 42);

    s.removeAll('a.b');

    assert.deepEqual(s.iterator().toArray(), []);
  });

  it('does not leak empty lists', function () {
    var s = new Store();
    s.add('x', 1);

    s.removeAll('x');

    assert.strictEqual(s._root._map.x, undefined);
  });

  it('does not throw if node does not exist', function () {
    var s = new Store();

    assert.doesNotThrow(function () {
      s.removeAll('x');
    });
  });

  it('removes all listeners if no name is given', function () {
    var s = new Store();
    s.add('x', 1);
    s.add('y', 2);

    s.removeAll();

    assert.deepEqual(s.iterator().toArray(), []);
  });

});
