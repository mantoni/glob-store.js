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

var Store       = require('../lib/store').Store;
var Iterator    = require('../lib/iterator').Iterator;
var MinIterator = require('min-iterator');
var Node        = require('glob-tree').Node;
var List        = require('live-list').List;


function createTree() {
  var root  = new Node('root');
  var listA = new List();
  var listB = new List();
  listA.push('a');
  listA.push('b');
  listB.push('c');
  listB.push('d');
  root.set('x', listA);
  root.set('y.z', listB);
  return root;
}


describe('iterator', function () {

  it('is a min iterator', function () {
    var i = new Iterator(new Node('root'));

    assert(i instanceof MinIterator);
  });

  it('iterates over glob-tree nodes with live-list values', function () {
    var i = new Iterator(createTree());

    assert.deepEqual(i.toArray(), ['a', 'b', 'c', 'd']);
  });

  it('iterates over named glob-tree node', function () {
    var i = new Iterator(createTree(), 'x');

    assert.deepEqual(i.toArray(), ['a', 'b']);
  });

  it('iterates over matching glob-tree node', function () {
    var i = new Iterator(createTree(), 'y.*');

    assert.deepEqual(i.toArray(), ['c', 'd']);
  });

});
