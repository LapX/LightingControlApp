import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Colorpicker from './components/ColorpickerScreen';
import Colorbuttons from './components/ColorbuttonsScreen';
import Colorsliders from './components/ColorslidersScreen';
import Bluetooth from './components/BluetoothScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';

const AppNavigator = createBottomTabNavigator(
  {
    Colorpicker: {
      screen: Colorpicker,
      navigationOptions: {
        tabBarLabel: 'Colorpicker',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name='ios-color-filter' size={30} color={tintColor} />
        )
      }
    },
    Colorbuttons: {
      screen: Colorbuttons,
      navigationOptions: {
        tabBarLabel: 'Buttons',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name='ios-color-palette' size={30} color={tintColor} />
        )
      }
    },
    Colorsliders: {
      screen: Colorsliders,
      navigationOptions: {
        tabBarLabel: 'Sliders',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name='sliders-h' size={30} color={tintColor} />
        )
      }
    },
    Bluetooth: {
      screen: Bluetooth,
      navigationOptions: {
        tabBarLabel: 'Bluetooth',
        tabBarIcon: ({ tintColor }) => (
          <Foundation name='bluetooth' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Bluetooth',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      activeBackgroundColor: '#2d2d2d',
      inactiveBackgroundColor: '#2433fe'
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
