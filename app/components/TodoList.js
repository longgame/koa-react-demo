'use strict;'

var _ = require('underscore'),
    $ = require('jquery');

import React from 'react';
import { LinkedStateMixin } from 'react-addons';
import Reflux from 'reflux';

import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

import template from './TodoList.rt';
import styles from './TodoList.scss';

var TodoList = React.createClass({
  mixins: [ Reflux.connect(TodoStore, 'list') ],
  getInitialState: function() {
    return {
      list: TodoStore.list,
    };
  },
  displayedItems: function() {
    switch (this.props.location.pathname) {
      case '/':
      case '/all':
        return this.state.list;
      case '/complete':
        return _.where(this.state.list, {
          isComplete: true
        });
      case '/active':
        return _.where(this.state.list, {
          isComplete: false
        });
    }
  },
  render: template
});

export default TodoList;
export { TodoActions };
export { TodoStore };
