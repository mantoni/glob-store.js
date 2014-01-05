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


describe('store.add', function () {

  it('adds single values for key', function () {
    var s = new Store();

    s.add('a.b', 42);

    assert.deepEqual(s.iterator().toArray(), [42]);
  });

  it('adds multiple values for different keys', function () {
    var s = new Store();

    s.add('a', 1);
    s.add('b', 2);
    s.add('c', 3);

    assert.deepEqual(s.iterator().toArray(), [1, 2, 3]);
  });

  it('adds multiple values for same key', function () {
    var s = new Store();

    s.add('x', 1);
    s.add('x', 2);
    s.add('x', 3);

    assert.deepEqual(s.iterator().toArray(), [1, 2, 3]);
  });

});
