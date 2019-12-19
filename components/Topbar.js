import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';

export default class Topbar extends Component {
  openWebsite = () => {
    Linking.openURL('https://borealux.com/product-category/promotions/');
  };

  render() {
    return (
      <TouchableOpacity onPress={this.openWebsite} style={styles.container}>
        <Image
          source={{ uri: 'https://borealux.com/signatures/promo.gif' }}
          style={{
            width: Dimensions.get('window').width,
            height: 60
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    width: Dimensions.get('window').width
  }
});
