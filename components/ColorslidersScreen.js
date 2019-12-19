import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  sendMessage,
  getBaseDataArray,
  getWhiteDataArray,
  getCurrentColorRGBW
} from '../modules/BleController';
import Slider from '@react-native-community/slider';
import Topbar from './Topbar';
import colorsys from 'colorsys';

export default class ColorslidersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: { r: 0, g: 0, b: 0, w: 0 }
    };
    this.props.navigation.addListener('willFocus', this.willFocus);
  }

  willFocus = () => {
    this.setState({ color: getCurrentColorRGBW() });
  };

  redColorChanged = value => {
    let data = getBaseDataArray();
    data[1] = value;
    sendMessage(data);
    this.willFocus();
  };

  greenColorChanged = value => {
    let data = getBaseDataArray();
    data[2] = value;
    sendMessage(data);
    this.willFocus();
  };

  blueColorChanged = value => {
    let data = getBaseDataArray();
    data[3] = value;
    sendMessage(data);
    this.willFocus();
  };

  whiteColorChanged = value => {
    let data = getWhiteDataArray();
    data[4] = value;
    sendMessage(data);
    this.willFocus();
  };

  render() {
    return (
      <View style={styles.container}>
        <Topbar />
        <View style={styles.sliders}>
          <View
            style={{
              backgroundColor: colorsys.rgb2Hex(
                this.state.color.r,
                this.state.color.g,
                this.state.color.b
              ),
              height: 50
            }}
          />
          <Slider
            ref='redSlider'
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={this.state.color.r}
            minimumTrackTintColor='#FF0000'
            thumbTintColor={'#FF0000'}
            onValueChange={value => this.redColorChanged(value)}
          />
          <Slider
            ref='greenSlider'
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={this.state.color.g}
            minimumTrackTintColor='#00FF00'
            thumbTintColor={'#00FF00'}
            onValueChange={value => this.greenColorChanged(value)}
          />
          <Slider
            ref='blueSlider'
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={this.state.color.b}
            minimumTrackTintColor='#0000FF'
            thumbTintColor={'#0000FF'}
            onValueChange={value => this.blueColorChanged(value)}
          />
          <Slider
            ref='whiteSlider'
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            step={1}
            value={this.state.color.w}
            minimumTrackTintColor='#FFFFFF'
            thumbTintColor={'#FFFFFF'}
            onValueChange={value => this.whiteColorChanged(value)}
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  sliders: {
    marginTop: 50
  },
  slider: {
    width: 200,
    transform: [{ scaleY: 2 }, { scaleX: 2 }],
    margin: 40
  }
});
