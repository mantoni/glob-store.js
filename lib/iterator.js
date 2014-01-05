/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var inherits    = require('inherits');
var MinIterator = require('min-iterator');


function Iterator(root, match) {
  this._i  = root.iterator(match);
  this._ii = null;
}

inherits(Iterator, MinIterator);

Iterator.prototype.next = function () {
  var v;
  while (true) {
    if (this._ii) {
      v = this._ii.next();
      if (v !== undefined) {
        return v;
      }
    }
    v = this._i.next();
    if (!v) {
      return;
    }
    this._ii = v.value.iterator();
  }
};


exports.Iterator = Iterator;
