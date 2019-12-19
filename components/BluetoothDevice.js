import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native';
import { scanAndConnect } from '../modules/BleController';

export default class BluetoothDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectButtonTitle: 'Connect',
      connectButtonColor: '#000ed8'
    };
  }

  connect = () => {
    scanAndConnect(this.props.deviceName, this.deviceConnectedCallback);
    this.setState({
      connectButtonTitle: 'Connecting...',
      connectButtonColor: '#840000'
    });
  };

  deviceConnectedCallback = () => {
    this.setState({
      connectButtonTitle: 'Connected',
      connectButtonColor: '#148405'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deviceName}>{this.props.deviceName}</Text>
        <View style={styles.button}>
          <Button
            onPress={this.connect}
            title={this.state.connectButtonTitle}
            color={this.state.connectButtonColor}
          />
        </View>
      </View>
    );
  }
}

BluetoothDevice.defaultProps = {
  deviceName: 'Default name'
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    backgroundColor: '#2433fe',
    marginTop: 20
  },

  button: {
    flex: 1,
    width: Dimensions.get('window').width / 5
  },

  deviceName: {
    marginLeft: 10,
    fontSize: 30,
    color: 'white'
  }
});
