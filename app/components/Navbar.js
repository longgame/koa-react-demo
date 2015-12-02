'use strict;'

import React, { Component } from 'react';
import { History } from 'react-router';

import { UserWidget } from './Widgets';

import template from './Navbar.rt';
import styles from './Navbar.scss';

module.exports = React.createClass({
  mixins: [ History ],
  render: template
});
