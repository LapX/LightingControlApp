import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';
import {
  sendMessage,
  getBaseDataArray,
  getCurrentColorHSV,
  getCurrentColorRGB
} from '../modules/BleController';
import AsyncStorage from '@react-native-community/async-storage';
import colorsys from 'colorsys';
import Slider from '@react-native-community/slider';
import Topbar from './Topbar';

export default class ColorpickerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FFFFFF',
      intensity: 1,
      colorA: '#FF0000',
      colorB: '#00FF00',
      colorC: '#0000FF',
      colorD: '#ff00bf'
    };
    this.props.navigation.addListener('willFocus', this.willFocus);
  }

  componentWillMount = async () => {
    const A = await AsyncStorage.getItem('colorA');
    const B = await AsyncStorage.getItem('colorB');
    const C = await AsyncStorage.getItem('colorC');
    const D = await AsyncStorage.getItem('colorD');

    if (A !== null) {
      this.setState({
        colorA: A
      });
    }

    if (B !== null) {
      this.setState({
        colorB: B
      });
    }

    if (C !== null) {
      this.setState({
        colorC: C
      });
    }

    if (D !== null) {
      this.setState({
        colorD: D
      });
    }
  };

  willFocus = () => {
    this.setState({ color: getCurrentColorHSV() });
  };

  colorChanged = color => {
    this.setState({
      color: color
    });
    this.sendColor();
  };

  intensityChanged = value => {
    this.setState({ intensity: value });
    this.sendColor();
  };

  sendColor = () => {
    const hsv = this.state.color;
    const rgb = colorsys.hsv2Rgb(hsv.h, hsv.s, hsv.v);
    let data = getBaseDataArray();
    data[1] = rgb.r * this.state.intensity;
    data[2] = rgb.g * this.state.intensity;
    data[3] = rgb.b * this.state.intensity;
    sendMessage(data);
  };

  sendColorA = () => {
    const hex = this.state.colorA;
    const rgb = colorsys.hex2Rgb(hex);
    let data = getBaseDataArray();
    data[1] = rgb.r;
    data[2] = rgb.g;
    data[3] = rgb.b;
    this.setState({
      color: colorsys.hex2Hsv(hex),
      intensity: 1
    });
    sendMessage(data);
  };

  sendColorB = () => {
    const hex = this.state.colorB;
    const rgb = colorsys.hex2Rgb(hex);
    let data = getBaseDataArray();
    data[1] = rgb.r;
    data[2] = rgb.g;
    data[3] = rgb.b;
    this.setState({
      color: colorsys.hex2Hsv(hex),
      intensity: 1
    });
    sendMessage(data);
  };

  sendColorC = () => {
    const hex = this.state.colorC;
    const rgb = colorsys.hex2Rgb(hex);
    let data = getBaseDataArray();
    data[1] = rgb.r;
    data[2] = rgb.g;
    data[3] = rgb.b;
    this.setState({
      color: colorsys.hex2Hsv(hex),
      intensity: 1
    });
    sendMessage(data);
  };

  sendColorD = () => {
    const hex = this.state.colorD;
    const rgb = colorsys.hex2Rgb(hex);
    let data = getBaseDataArray();
    data[1] = rgb.r;
    data[2] = rgb.g;
    data[3] = rgb.b;
    this.setState({
      color: colorsys.hex2Hsv(hex),
      intensity: 1
    });
    sendMessage(data);
  };

  saveColorA = async () => {
    const hsv = this.state.color;
    const hex = colorsys.hsv2Hex(hsv);
    this.setState({
      colorA: hex
    });
    await AsyncStorage.setItem('colorA', this.state.colorA);
  };

  saveColorB = async () => {
    const hsv = this.state.color;
    const hex = colorsys.hsv2Hex(hsv);
    this.setState({
      colorB: hex
    });
    await AsyncStorage.setItem('colorB', this.state.colorB);
  };

  saveColorC = async () => {
    const hsv = this.state.color;
    const hex = colorsys.hsv2Hex(hsv);
    this.setState({
      colorC: hex
    });
    await AsyncStorage.setItem('colorC', this.state.colorC);
  };

  saveColorD = async () => {
    const hsv = this.state.color;
    const hex = colorsys.hsv2Hex(hsv);
    this.setState({
      colorD: hex
    });
    await AsyncStorage.setItem('colorD', this.state.colorD);
  };

  render() {
    return (
      <View style={styles.container}>
        <Topbar />
        <ColorWheel
          initialColor={this.state.color}
          thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
          style={styles.colorWheel}
          onColorChange={color => this.colorChanged(color)}
        />
        <View style={styles.colorButtons}>
          <TouchableOpacity
            onPress={this.sendColorA}
            onLongPress={this.saveColorA}
            style={[styles.colorButton, { backgroundColor: this.state.colorA }]}
          />
          <TouchableOpacity
            onPress={this.sendColorB}
            onLongPress={this.saveColorB}
            style={[styles.colorButton, { backgroundColor: this.state.colorB }]}
          />
          <TouchableOpacity
            onPress={this.sendColorC}
            onLongPress={this.saveColorC}
            style={[styles.colorButton, { backgroundColor: this.state.colorC }]}
          />
          <TouchableOpacity
            onPress={this.sendColorD}
            onLongPress={this.saveColorD}
            style={[styles.colorButton, { backgroundColor: this.state.colorD }]}
          />
        </View>
        <Slider
          style={styles.slider}
          onValueChange={value => this.intensityChanged(value)}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={this.state.intensity}
          minimumTrackTintColor={colorsys.hsv2Hex(this.state.color)}
          thumbTintColor={colorsys.hsv2Hex(this.state.color)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    justifyContent: 'flex-end'
  },

  colorWheel: {
    flex: 6,
    height: 400,
    width: 400,
    marginTop: 10
  },

  slider: {
    flex: 1,
    width: 200,
    transform: [{ scaleY: 2 }, { scaleX: 2 }]
  },

  colorButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  colorButton: {
    flex: 1,
    width: 30,
    height: 60,
    marginLeft: 10,
    marginRight: 10
  }
});
