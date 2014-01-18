/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var Node     = require('./node').Node;
var Iterator = require('./iterator').Iterator;


function Store() {
  this._root = new Node('root');
}

Store.prototype = {

  values: function (name) {
    if (name) {
      var list = this._root.get(name);
      return list ? list.toArray() : [];
    }
    return this.iterator().toArray();
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

  iterator: function (match) {
    return new Iterator(this._root, match);
  }

};

exports.Store = Store;
