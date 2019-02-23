import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Zocial from 'react-native-vector-icons/Zocial';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { responsiveFontSize } from '../utils/Responsive';

const IconsTypes = {
  Zocial,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  EvilIcons,
  Entypo,
  FontAwesome,
  SimpleLineIcons,
  Feather,
  AntDesign,
  FontAwesome5
};

class Icon extends Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    noFlip: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    rtl: PropTypes.bool,
    flip: PropTypes.bool,
  };

  static defaultProps = {
    size: 8,
  };

  render() {
    const { type, name, size, flip, rtl, ...rest } = this.props;
    const NativeIcon = IconsTypes[type] || Entypo;

    return (
      <NativeIcon
        {...rest}
        name={name}
        style={[
          {
            fontSize: Math.round(responsiveFontSize(size)),
          },
          flip &&
            rtl && {
              transform: [{ scaleX: -1 }],
            },
          this.props.aStyles,
          this.props.style,
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Icon);
