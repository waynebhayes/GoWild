import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AppRegistry, Image, StatusBar,View, ImageBackground  } from "react-native";
import AppConfig from '../../../config.js'

const styles = {
  hamburger: {
    width: 35,
    height: 5,
    backgroundColor: AppConfig.Colors.HamburgerMenu,
    marginTop: 3,
    marginBottom: 3
  },
};

class Hamburger extends Component {
  render() {
    return (
      <View>
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
        <View style={styles.hamburger} />
      </View>
    );
  }
}

export default Hamburger
