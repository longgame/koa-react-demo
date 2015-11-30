'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import Reflux from 'reflux';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

import template from './templates/LoginForm.rt';

module.exports = React.createClass({
  mixins: [ LinkedStateMixin ],
  getInitialState: function() {
    return {
      user: {},
      email: null,
      password: null,
    };
  },
  handleSubmit: function(event) {
    UserActions.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  },
  render: template
});
