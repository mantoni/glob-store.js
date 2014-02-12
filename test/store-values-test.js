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


describe('store.values', function () {

  it('returns the values for the named node', function () {
    var s = new Store();
    s.add('a.b.c', 1);
    s.add('a.b.c', 2);
    s.add('a.b.c', 3);

    var a = s.values('a.b.c');

    assert.deepEqual(a, [1, 2, 3]);
  });

  it('returns an empty array if node does not exist', function () {
    var s = new Store();

    var a = s.values('a.b.c');

    assert.deepEqual(a, []);
  });

  it('returns all items from all nodes if name is not given', function () {
    var s = new Store();
    s.add('*', 0);
    s.add('a', 1);
    s.add('a', 2);
    s.add('a.b', 3);

    var a = s.values();

    assert.deepEqual(a, [0, 1, 2, 3]);
  });

});
