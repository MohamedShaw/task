import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';

import AppView from './AppView';
import AppText from './AppText';
import { responsiveFontSize, moderateScale } from '../utils/Responsive';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

class AppInput extends Component {
  static propTypes = {
    fontFamily: PropTypes.string,
    size: PropTypes.number,
  };

  static defaultProps = {
    // fontFamily: Fonts.cocon,
    fontFamily: "Ionicons",
    size: 6,
    errors: {},
    touched: {},
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.inActiveColor = Colors.inActiveText;
    this.activeColor = Colors.activeText;

    this.state = {
      text: props.value,
      color: this.inActiveColor,
    };
  }

  onChangeText = text => {
    if (this.props.onChangeText) {
      this.props.onChangeText(this.props.name, text);

      if (this.props.validationSchema) {
        this.props.validationSchema
          .validate({ [this.props.name]: text })
          .then(() => {})
          .catch(err => {});
      }
    }
    this.setState({
      text,
    });
  };

  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.props.name);
    }
    this.setState({
      color: this.inActiveColor,
    });
  };

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.props.name);
    }
    this.setState({
      color: this.activeColor,
    });
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  clear = () => {
    this.inputRef.current.clear();
  };

  renderLeftIcon = () => {
    const { size, leftIcon } = this.props;
    return React.cloneElement(leftIcon, {
      color: this.state.color,
      aStyles: {
        paddingHorizontal: moderateScale(size * 0.8),
      },
    });
  };

  renderRightIcon = () => {
    const { size, rightIcon } = this.props;
    return React.cloneElement(rightIcon, {
      color: this.state.color,
      aStyles: {
        paddingHorizontal: moderateScale(size * 0.8),
      },
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value) {
      this.props.onChangeText(this.props.name, nextProps.value);
      this.setState({
        text: nextProps.value,
      });;
    }
  }

  render() {
    const { leftIcon, rightIcon, width, height, rtl, editable,multiline, numberOfLines } = this.props;

    return (
      // <React.Fragment>
      <AppView
        style={[{ alignSelf: 'stretch' }, this.props.outerContainerStyle]}
      >
        <AppView
          width={width}
          height={height}
          row
          style={[{ alignSelf: 'stretch' }, this.props.containerStyle]}
        >
          {leftIcon && this.renderLeftIcon()}
          <TextInput
            {...this.props}
            width={undefined}
            height={undefined}
            blurOnSubmit
            ref={this.inputRef}
            value={this.state.text}
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeText}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={[
              {
                flex: 1,
                textAlign: rtl ? 'right' : 'left',
                writingDirection: rtl ? 'rtl' : 'ltr',
                fontFamily: this.props.fontFamily,
                fontSize: Math.round(responsiveFontSize(this.props.size)),
                color: this.state.color,
              },
              this.props.inputStyle,
            ]}
          />
          {rightIcon && this.renderRightIcon()}
        </AppView>

        {(this.props.errors[this.props.name] &&
          this.props.touched[this.props.name]) ||
        this.props.errorMessage ? (
          <AppText
            size={this.props.size * 0.8}
            style={{ color: Colors.error, marginHorizontal: moderateScale(3) }}
          >
            {this.props.errors[this.props.name] || this.props.errorMessage}
          </AppText>
        ) : null}
      </AppView>
      // </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true },
)(AppInput);
