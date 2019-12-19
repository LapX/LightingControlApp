import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
import {
  getListOfDevices,
  disconnectFromDevice
} from '../modules/BleController';
import Topbar from './Topbar';
import BluetoothDevice from './BluetoothDevice';

export default class BluetoothScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      scanningButtonTitle: 'Scan',
      scanningButtonColor: '#840000'
    };
  }

  componentWillMount = () => {
    this.scan();
  };

  scan = () => {
    disconnectFromDevice();
    getListOfDevices(this.scanningEndedCallback, this.bluetoothNotEnabledError);
    this.setState({
      devices: [],
      scanningButtonTitle: 'Scanning...',
      scanningButtonColor: '#840000'
    });
  };

  scanningEndedCallback = devices => {
    this.setState({
      devices: devices,
      scanningButtonTitle: 'Scan',
      scanningButtonColor: '#148405'
    });
  };

  bluetoothNotEnabledError = () => {
    Alert.alert(
      'Veuillez activer le Bluetooth de votre appareil pour continuer.'
    );
  };

  render = () => {
    return (
      <View style={styles.container}>
        <Topbar />
        <FlatList
          data={this.state.devices}
          renderItem={({ item }) => (
            <BluetoothDevice key={item.name} deviceName={item.name} />
          )}
        />
        <View style={styles.button}>
          <Button
            onPress={this.scan}
            title={this.state.scanningButtonTitle}
            color={this.state.scanningButtonColor}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  button: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end'
  }
});
