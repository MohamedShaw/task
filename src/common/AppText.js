import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text as NativeText } from 'react-native';
import { connect } from 'react-redux';

import { responsiveFontSize } from '../utils/Responsive';
// import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

class AppText extends Component {
  static propTypes = {
    fontFamily: PropTypes.string,
    size: PropTypes.number,
    bold: PropTypes.bool,
  };

  static defaultProps = {
    // fontFamily: Fonts.cocon,
    fontFamily: "Ionicons",
    size: 6,
    bold: false,
  };

  render() {
    const {
      rtl,
      fontFamily,
      size,
      bold,
      style,
      children,
      center,
      ...rest
    } = this.props;

    return (
      <NativeText
        {...rest}
        style={[
          {
            color: Colors.normal,
            writingDirection: rtl ? 'rtl' : 'ltr',
            textAlign: rtl ? 'right' : 'left',
            fontSize: Math.round(responsiveFontSize(size)),
            // fontFamily: bold ? Fonts.coconBold : fontFamily,
            fontFamily: fontFamily,
          },
          center && { textAlign: 'center' },
          style,
        ]}
      >
        {children}
      </NativeText>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(AppText);
