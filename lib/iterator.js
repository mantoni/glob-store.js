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


function Iterator(root, match, opts) {
  this._i   = root.iterator(match, opts);
  this._ii  = null;
  this.name = null;
}

inherits(Iterator, MinIterator);

Iterator.prototype.next = function () {
  var v;
  while (true) {
    if (this._ii && (v = this._ii.next()) !== undefined) {
      return v;
    }
    if ((v = this._i.next()) === undefined) {
      return;
    }
    this.name = v.path;
    this._ii = v.value.iterator();
  }
};


exports.Iterator = Iterator;
