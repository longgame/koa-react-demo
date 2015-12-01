'use strict;'

import React, { Component } from 'react';
import { LinkedStateMixin } from 'react-addons';
import Reflux from 'reflux';

import { UserStore, UserActions } from '../Forms';

import template from './RegistrationForm.rt';

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
    /* FIXME: Check credentials first
    UserActions.registerNewUser({
      email: this.state.email,
      password: this.state.password
    });
  /**/
  },
  handleCancel: function(event) {
    // FIXME: Go back
  },
  render: template
});
