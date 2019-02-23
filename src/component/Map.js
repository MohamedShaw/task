import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import React, { Component } from "react";

// remove PROVIDER_GOOGLE import if not using Google Maps

import { View, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class Map extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };
  onRegionChange = (region)=> {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
      style = {{
          width:500,
          height:500
      }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}
