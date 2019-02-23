
 import React, { Component } from 'react';
 import { View as NativeView } from 'react-native';
 import { connect } from 'react-redux';
 
 import { responsiveWidth, responsiveHeight } from '../utils/Responsive';
 
 class View extends Component {
   childrenLayoutStyles = () => {
     const styles = {};
     const { rtl, row } = this.props;
 
     if (row) {
       styles.flexDirection = rtl ? 'row-reverse' : 'row';
       styles.alignItems = 'center';
     } else {
       styles.flexDirection = 'column';
       styles.alignItems = rtl ? 'flex-end' : 'flex-start';
     }
 
     return styles;
   };
 
   render() {
     const { width, height, ...rest } = this.props;
     return (
       <NativeView
         {...rest}
         style={[
           {
             width: responsiveWidth(width),
             height: responsiveHeight(height),
           },
           this.childrenLayoutStyles(),
           this.props.style,
         ]}
       >
         {this.props.children}
       </NativeView>
     );
   }
 }
 
 const mapStateToProps = state => ({
   rtl: state.lang.rtl,
 });
 
 export default connect(mapStateToProps)(View);
 