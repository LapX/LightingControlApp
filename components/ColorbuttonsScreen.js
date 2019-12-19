import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  ListItem,
  Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  sendMessage,
  getBaseDataArray,
  getModeSelectionDataArray
} from '../modules/BleController';
import Topbar from './Topbar';

export default class ColorbuttonsScreen extends Component {
  constructor() {
    super();
    this.state = {
      speed: 5,
      lastModeUsed: 0x25,
      modes: [
        {
          key: 'RGB Fade',
          icon: require('../images/fullColorWheel.png'),
          pressed: this.mode1
        },
        {
          key: 'Red Breathing',
          icon: require('../images/redButton.png'),
          pressed: this.mode2
        },
        {
          key: 'Green Breathing',
          icon: require('../images/greenButton.png'),
          pressed: this.mode3
        },
        {
          key: 'Blue Breathing',
          icon: require('../images/blueButton.png'),
          pressed: this.mode4
        },
        {
          key: 'Yellow Breathing',
          icon: require('../images/yellowButton.png'),
          pressed: this.mode5
        },
        {
          key: 'RGB Strobe',
          icon: require('../images/fullColorWheel.png'),
          pressed: this.mode6
        },
        {
          key: 'Red Strobe',
          icon: require('../images/redFlash.png'),
          pressed: this.mode7
        },
        {
          key: 'Green Strobe',
          icon: require('../images/greenFlash.png'),
          pressed: this.mode8
        },
        {
          key: 'Blue Strobe',
          icon: require('../images/blueFlash.png'),
          pressed: this.mode9
        },
        {
          key: 'Yellow Strobe',
          icon: require('../images/yellowFlash.png'),
          pressed: this.mode10
        },
        {
          key: 'Cyan Strobe',
          icon: require('../images/cyanFlash.png'),
          pressed: this.mode11
        },
        {
          key: 'Purple Strobe',
          icon: require('../images/purpleFlash.png'),
          pressed: this.mode12
        },
        {
          key: 'White Strobe',
          icon: require('../images/whiteFlash.png'),
          pressed: this.mode13
        },
        {
          key: 'RGB Chase',
          icon: require('../images/fullColorWheel.png'),
          pressed: this.mode14
        }
      ]
    };
  }

  changeColorToRed = () => {
    let data = getBaseDataArray();
    data[1] = 255;
    data[2] = 0;
    data[3] = 0;
    sendMessage(data);
  };

  changeColorToGreen = () => {
    let data = getBaseDataArray();
    data[1] = 0;
    data[2] = 255;
    data[3] = 0;
    sendMessage(data);
  };

  changeColorToBlue = () => {
    let data = getBaseDataArray();
    data[1] = 0;
    data[2] = 0;
    data[3] = 255;
    sendMessage(data);
  };

  mode1 = () => {
    const mode = 0x25;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode2 = () => {
    const mode = 0x26;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode3 = () => {
    const mode = 0x27;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode4 = () => {
    const mode = 0x28;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode5 = () => {
    const mode = 0x29;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode6 = () => {
    const mode = 0x30;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode7 = () => {
    const mode = 0x31;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode8 = () => {
    const mode = 0x32;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode9 = () => {
    const mode = 0x33;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode10 = () => {
    const mode = 0x34;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode11 = () => {
    const mode = 0x35;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode12 = () => {
    const mode = 0x36;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode13 = () => {
    const mode = 0x37;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };
  mode14 = () => {
    const mode = 0x38;
    let data = getModeSelectionDataArray();
    data[1] = mode;
    data[2] = this.state.speed;
    this.setLastModeUsed(mode);
    sendMessage(data);
  };

  setLastModeUsed = mode => {
    this.setState({
      lastModeUsed: mode
    });
  };

  speedChanged = value => {
    let data = getModeSelectionDataArray();
    this.setState({
      speed: this.calculateSpeed(value)
    });
    data[1] = this.state.lastModeUsed;
    data[2] = this.state.speed;
    sendMessage(data);
  };

  calculateSpeed = value => {
    const speedOffset = 13;
    return speedOffset - value;
  };

  render() {
    return (
      <View style={styles.container}>
        <Topbar />
        <FlatList
          data={this.state.modes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.flatlistItem}
              onPress={item.pressed}
            >
              <Image style={styles.image} source={item.icon} />
              <Text style={styles.flatlistText}>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
        <Slider
          style={styles.slider}
          onValueChange={value => this.speedChanged(value)}
          minimumValue={1}
          maximumValue={12}
          step={1}
          value={5}
          minimumTrackTintColor='#2433fe'
          thumbTintColor={'#2433fe'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  image: { width: 40, height: 40 },
  slider: {
    width: 200,
    transform: [{ scaleY: 2 }, { scaleX: 2 }],
    marginTop: 15,
    marginBottom: 15
  },
  flatlistItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    width: Dimensions.get('window').width
  },
  flatlistText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 10
  }
});
