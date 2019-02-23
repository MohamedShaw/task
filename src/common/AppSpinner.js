import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../utils/Colors';

export default class AppSpinner extends Component {
  render() {
    return <ActivityIndicator {...this.props} color={Colors.primary} />;
  }
}
