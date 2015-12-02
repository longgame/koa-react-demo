'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import { History } from 'react-router';
import Reflux from 'reflux';

import { UserStore, UserActions } from '../Forms';

import template from './RegistrationForm.rt';

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
    // FIXME: Check for invalid credentials

    UserActions.registerUser({
      email: this.state.email,
      password: this.state.password
    });
  },
  handleCancel: function(event) {
    this.history.goBack();
  },
  render: template
});
