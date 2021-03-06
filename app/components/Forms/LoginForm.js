'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import { History } from 'react-router';
import Reflux from 'reflux';

import { UserStore, UserActions } from '../Forms';

import template from './LoginForm.rt';

module.exports = React.createClass({
  mixins: [ History, LinkedStateMixin ],
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
    this.history.pushState(null, '/register');
  },
  render: template
});
