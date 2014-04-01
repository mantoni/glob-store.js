/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
/*globals describe, it, beforeEach*/
'use strict';

var assert = require('assert');

var Store    = require('../lib/store').Store;
var Iterator = require('../lib/iterator').Iterator;


describe('store.iterator', function () {
  var s;

  beforeEach(function () {
    s = new Store();
    s.add('a.b', 1);
    s.add('a.c', 2);
    s.add('b.d', 3);
    s.add('**', 4);
    s.add('a.*', 5);
  });

  it('returns a new iterator', function () {
    assert(s.iterator() instanceof Iterator);
  });

  it('returns an iterator matching the given expression', function () {
    var i = s.iterator('a.*');

    assert.deepEqual(i.toArray(), [4, 5, 1, 2]);
  });

  it('allows to exclude matchers', function () {
    var i = s.iterator('a.*', { matchers : false });

    assert.deepEqual(i.toArray(), [1, 2]);
  });

  it('allows to include only matchers', function () {
    var i = s.iterator('a.*', { onlyMatchers : true });

    assert.deepEqual(i.toArray(), [4, 5]);
  });

  it('exposes the current node name on the iterator', function () {
    var i = s.iterator('a.*');
    var k = [];

    while (i.next()) {
      k.push(i.name);
    }

    assert.deepEqual(k, ['**', 'a.*', 'a.b', 'a.c']);
  });

});
