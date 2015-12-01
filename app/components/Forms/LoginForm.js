'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import Reflux from 'reflux';

import { UserStore, UserActions } from '../Forms';

import template from './LoginForm.rt';

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
  handleRegister: function(event) {
    UserActions.registerUser({
      email: this.state.email
    });
  },
  render: template
});
