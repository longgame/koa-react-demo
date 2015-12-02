'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';

import { TodoActions } from '../TodoList';

import template from './TodoItem.rt';
import styles from './TodoItem.scss';

import './pencil.png';
import './trash.png';

module.exports = React.createClass({
  mixins: [ LinkedStateMixin ],
  getInitialState: function() {
    return {
      isEditing: false,
      editValue: this.props.label,
    };
  },
  handleToggle: function(event) {
    TodoActions.toggleItem(this.props.id);
  },
  handleDelete: function(event) {
    TodoActions.removeItem(this.props.id);
  },
  handleEditStart: function() {
    this.setState({
      isEditing: true,
    });
  },
  handleValueChange: function(event) {
    if (event.which === 13) {   // Enter
      this.setState({
        isEditing: false,
      });
      TodoActions.editItem(
        this.props.id,
        this.state.editValue
      );
    } else if (event.which == 27) {     // Escape
      this.setState({
        editValue: this.props.label,
      });
    }
  },
  render: template
});
