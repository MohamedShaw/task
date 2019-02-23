import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import React, { Component } from "react";

// remove PROVIDER_GOOGLE import if not using Google Maps

import { View, StyleSheet, TouchableOpacity, TouchableHighlight, Text } from "react-native";


import Map from "../component/Map"

export default class Map extends Component {


    renderRestaurantInfo = () => {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 , backgroundColor:'agba(1,1,1,5)'}}>
                <Text>
                    {this.props.id}
                </Text>
            </View>
        )
    }


    render() {
        return (
            <View>

                <Map >
                    {this.renderRestaurantInfo()}
                </Map>
            </View>
        );
    }
}
