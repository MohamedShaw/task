import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import AppView from './AppView';

const styles = StyleSheet.create({
  rtl: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});

class AppHorizontalScrollView extends Component {
  render() {
    if (!this.props.children || this.props.children.length === 0) return null;

    const rchilds = this.props.children.map((c, index) => (
      <AppView key={Math.random().toString() + index} style={styles.rtl}>
        {c}
      </AppView>
    ));

    const childs = this.props.rtl ? rchilds : this.props.children;

    return (
      <ScrollView
        {...this.props}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[this.props.rtl && styles.rtl, this.props.style]}
      >
        {childs}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(AppHorizontalScrollView);
