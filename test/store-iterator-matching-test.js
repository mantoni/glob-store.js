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

var Store    = require('../lib/store').Store;
var Iterator = require('../lib/iterator').Iterator;


describe('store.iteratorMatching', function () {

  it('returns a new iterator', function () {
    var s = new Store();

    assert(s.iteratorMatching() instanceof Iterator);
  });

  it('returns an iterator matching the given expression', function () {
    var s = new Store();
    s.add('a.b', 1);
    s.add('a.c', 2);
    s.add('b.d', 3);
    s.add('**', 4);
    s.add('a.*', 5);

    var i = s.iteratorMatching('a.*');

    assert.deepEqual(i.toArray(), [4, 5, 1, 2]);
  });

});
