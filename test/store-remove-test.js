/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it*/
'use strict';

var assert = require('assert');

var Store = require('../lib/store').Store;


describe('store.remove', function () {

  it('remove value', function () {
    var s = new Store();
    s.add('a.b', 42);

    s.remove('a.b', 42);

    assert.deepEqual(s.iterator().toArray(), []);
  });

  it('does not remove other values with same name', function () {
    var s = new Store();
    s.add('a.b', 7);
    s.add('a.b', 42);

    s.remove('a.b', 42);

    assert.deepEqual(s.iterator().toArray(), [7]);
  });

  it('does not leak empty lists', function () {
    var s = new Store();
    s.add('x', 1);

    s.remove('x', 1);

    assert.strictEqual(s._root._map.x, undefined);
  });

  it('does not throw if node does not exist', function () {
    var s = new Store();

    assert.doesNotThrow(function () {
      s.remove('x', 1);
    });
  });

});
