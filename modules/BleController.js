import { BleManager } from 'react-native-ble-plx';
import base64 from 'react-native-base64';
import colorsys from 'colorsys';

let manager = new BleManager();
const serviceUUID = '0000ffe5-0000-1000-8000-00805f9b34fb';
const writeCharacteristicUUID = '0000ffe9-0000-1000-8000-00805f9b34fb';
const readCharacteristicUUID = '0000fff0-0000-1000-8000-00805f9b34fb';
let connectedDevice = {};
let currentColor = { r: 255, g: 255, b: 255, w: 0 };
let deviceArray = [];

export function getListOfDevices(callback, bleErrorCallback) {
  const startTime = new Date().getTime();
  manager.startDeviceScan(null, null, (error, device) => {
    console.log('Starting search for BLE device.');
    if (error) {
      console.log('Error : ' + error.message);
      bleErrorCallback();
      return;
    }
    if (device.name != null) {
      let deviceIsNotInList = true;
      deviceArray.forEach(d => {
        if (d.name === device.name) {
          deviceIsNotInList = false;
        }
      });

      if (deviceIsNotInList) {
        console.log('new device found');
        deviceArray.push({ key: device.name, name: device.name });
      }

      if (new Date().getTime() - startTime > 2000) {
        manager.stopDeviceScan();
        console.log('BleController array: ' + JSON.stringify(deviceArray));
        callback(deviceArray);
        return;
      }
    }
  });
}

export function scanAndConnect(deviceName, callback) {
  manager.startDeviceScan(null, null, (error, device) => {
    console.log('Starting search for BLE device.');
    if (error) {
      console.log('Error : ' + error.message);
      return;
    }

    if (device.name === deviceName) {
      console.log('Found : ' + device.name);
      manager.stopDeviceScan();
      device
        .connect()
        .then(device => {
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(device => {
          console.log('Device : ' + device.name + ' connected succesfully.');
          connectedDevice = device;
          callback();
        })
        .catch(error => {
          console.log('Error : ' + error.message);
        });
    }
  });
}

export function sendMessage(message) {
  if (
    typeof connectedDevice.writeCharacteristicWithResponseForService !==
    'undefined'
  ) {
    console.log('Sending : ' + message);
    saveColor(message);
    const b64message = arrayToBase64(message);

    connectedDevice
      .writeCharacteristicWithoutResponseForService(
        serviceUUID,
        writeCharacteristicUUID,
        b64message
      )
      .then(response => {
        console.log('Wrote to device succesfully');
        console.log('response : ' + response.value);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function disconnectFromDevice() {
  manager.destroy();
  manager = new BleManager();
}

export function getBaseDataArray() {
  const x = new ArrayBuffer(7);
  let data = new Uint8Array(x);
  data[0] = 0x56;
  data[1] = currentColor.r;
  data[2] = currentColor.g;
  data[3] = currentColor.b;
  data[4] = currentColor.w;
  data[5] = 0xf0;
  data[6] = 0xaa;
  console.log('Returning : ' + data);
  return data;
}

export function getModeSelectionDataArray() {
  const x = new ArrayBuffer(7);
  let data = new Uint8Array(x);
  data[0] = 0xbb;
  data[1] = 0x25;
  data[2] = 0x05;
  data[3] = 0x44;
  data[4] = 0x00;
  data[5] = 0xf0;
  data[6] = 0xaa;
  console.log('Returning : ' + data);
  return data;
}

export function getWhiteDataArray() {
  const x = new ArrayBuffer(7);
  let data = new Uint8Array(x);
  data[0] = 0x56;
  data[1] = currentColor.r;
  data[2] = currentColor.g;
  data[3] = currentColor.b;
  data[4] = currentColor.w;
  data[5] = 0x0f;
  data[6] = 0xaa;
  console.log('Returning : ' + data);
  return data;
}

export function getCurrentColorRGB() {
  return { r: currentColor.r, g: currentColor.g, b: currentColor.b };
}
export function getCurrentColorRGBW() {
  return currentColor;
}
export function getCurrentColorHEX() {
  return colorsys.rgb2Hex(currentColor.r, currentColor.g, currentColor.b);
}

export function getCurrentColorHSV() {
  return colorsys.rgb2Hsv(currentColor.r, currentColor.g, currentColor.b);
}

function arrayToBase64(bytes) {
  let binary = '';
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64.encode(binary);
}

function saveColor(data) {
  if (data[0] === 0x56) {
    currentColor = { r: data[1], g: data[2], b: data[3], w: data[4] };
  }
}
