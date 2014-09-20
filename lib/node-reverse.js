/*
 * glob-store.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var inherits = require('inherits');
var TreeNode = require('glob-tree').Node;
var List     = require('live-list').List;


function Node(name) {
  TreeNode.call(this, name);
}

inherits(Node, TreeNode);

Node.prototype._value = function (value) {
  if (!this.value) {
    this.value = new List();
  }
  this.value.unshift(value);
};


exports.Node = Node;
