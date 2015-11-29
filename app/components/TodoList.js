'use strict;'

var _ = require('underscore'),
    $ = require('jquery');

import React from 'react';
import { LinkedStateMixin } from 'react-addons';
import classNames from 'classnames';
import Reflux from 'reflux';

import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

import template from './templates/TodoList.rt';

module.exports = React.createClass({
  mixins: [ Reflux.connect(TodoStore, 'list') ],
  getInitialState: function() {
    return {
      list: TodoStore.list,
    };
  },
  render: template
});
