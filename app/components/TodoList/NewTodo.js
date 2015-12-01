'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';

import { TodoActions } from '../TodoList';

import template from './NewTodo.rt';

module.exports = React.createClass({
  handleToggleAll: function(event) {
    TodoActions.toggleAllItems();
  },
  handleValueChange: function(event) {
    var text = event.target.value;
    if (event.which === 13 && text) {   // Enter
      TodoActions.addItem(text);
      event.target.value = '';
    } else if (event.which == 27) {     // Escape
      event.target.value = '';
    }
  },
  render: template
});
