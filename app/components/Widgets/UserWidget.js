'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import { History } from 'react-router';
import Reflux from 'reflux';

import { UserStore, UserActions } from '../Widgets';

import template from './UserWidget.rt';
import styles from './UserWidget.scss';

module.exports = React.createClass({
  mixins: [ History, LinkedStateMixin,
            Reflux.connect(UserStore, 'title') ],
  getInitialState: function() {
    return {
      user: {},
      email: null,
      password: null,
      title: 'Login',
    };
  },
  handleLogin: function(event) {
    UserActions.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  },
  handleRegister: function(event) {
    UserActions.loginUser({
      email: this.state.email,
      password: this.state.password
    });
  },
  render: template
});
