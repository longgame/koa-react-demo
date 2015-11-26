'use strict;'

var Reflux = require('reflux');

var TodoActions = Reflux.createActions([
  'toggleItem',
  'toggleAllItems',
  'addItem',
  'removeItem',
  'clearCompleted',
  'editItem',
]);

module.exports = TodoActions;
