/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var Node        = require('./node').Node;
var NodeReverse = require('./node-reverse').Node;
var Iterator    = require('./iterator').Iterator;


function Store(opts) {
  this._root = opts && opts.reverse
    ? new NodeReverse('root')
    : new Node('root');
}

Store.prototype = {

  values: function (match) {
    return this.iterator(match).toArray();
  },

  add: function (name, value) {
    this._root.set(name, value);
  },

  remove: function (name, value) {
    var list = this._root.get(name);
    if (list) {
      list.remove(value);
      if (!list.length) {
        this._root.remove(name);
      }
    }
  },

  removeAll: function (name) {
    if (name) {
      this._root.remove(name);
    } else {
      this._root.removeAll();
    }
  },

  iterator: function (match, opts) {
    return new Iterator(this._root, match, opts);
  }

};

exports.Store = Store;
