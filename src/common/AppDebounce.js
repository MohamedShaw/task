import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { responsiveWidth, responsiveHeight } from '../utils/Responsive';
import AppView from './AppView';

const log = () => {
  console.log('Please attach a method to this component');
};

class AppDebounce extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    recoverTime: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onPress: log,
    recoverTime: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  onPress = event => {
    if (!this.props.disabled) {
      if (!this.state.pressed) {
        this.setState({ pressed: true }, () => {
          this.props.onPress(event);
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.setState({
              pressed: false,
            });
            clearTimeout(this.timer);
          }, this.props.recoverTime);
        });
      }
    }
  };

  render() {
    const { children, style, rtl, width, height, ...rest } = this.props;
    return (
      <TouchableNativeFeedback {...rest} onPress={this.onPress}>
        <AppView width={width} height={height} style={[style]}>
          {children}
        </AppView>
      </TouchableNativeFeedback>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(AppDebounce);
