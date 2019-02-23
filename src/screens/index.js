import React, {Component} from "react"
import { Navigation } from "react-native-navigation";

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import FindRest from "./FindRest";
import Home from "./Home";



export const registerScreens=()=> {
  Navigation.registerComponent(`FindRest`, () => gestureHandlerRootHOC( FindRest ));
  Navigation.registerComponent(`Home`, () => gestureHandlerRootHOC( Home ));


}

