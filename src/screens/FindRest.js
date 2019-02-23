import React ,  { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {Navigation} from "react-native-navigation"

export default class FindRest extends Component{
    render(){
        return(
            <View style={{alignItems:"center", justifyContent:'center', alignSelf:'stretch', flex:1, backgroundColor:'red'}}>
                <TouchableOpacity onPress={()=>{
                    Navigation.push("TEST", {
                        name:'Home',
                        passProps:{
                            id: 15
                        }
                    })
                }}>
                    <Text>
                        Find Rest
                        </Text>
                    </TouchableOpacity>
                </View>
        )
    }
}