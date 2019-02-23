import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { responsiveWidth, responsiveHeight } from '../utils/Responsive';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const log = () => {
  console.log('Please attach a method to this component');
};

class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    recoverTime: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    onPress: log,
    recoverTime: 0,
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
      if (this.props.recoverTime) {
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
      } else {
        this.props.onPress(event);
      }
    }
  };

  render() {
    const { children, style, rtl, width, height, ...rest } = this.props;
    return (
      <RectButton
        {...rest}
        style={[
          {
            flexDirection: rtl ? 'row-reverse' : 'row',
            width: responsiveWidth(width),
            height: responsiveHeight(height),
            
          },
          styles.container,
          style,
        ]}
        onPress={this.onPress}
      >
        {children}
      </RectButton>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(Button);
