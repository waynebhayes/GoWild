import React, { Component } from 'react';
import { Platform, View,  } from 'react-native';
import { Container, Content, Header, Body, Text, Button, Drawer, Item, Input, Label  } from 'native-base';
import { Constants, Location, Permissions, MapView } from 'expo';
import Sidebar from '../sidebar/sidebar'
import AppConfig from '../../../config.js'

const styles = {
  bgstyle: {
    flex: 1,
    backgroundColor: AppConfig.Colors.Background
  },
  contentStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 10,
    height: '100%'
  },
  topContent: {
    flex: 0.33
  },
  map: {
    flex: 0.67,
    borderColor: AppConfig.Colors.ButtonColor,
    borderWidth: 3,
    padding: 5
  },
  buttonWrap: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  buttonStyle: {
    width: '30%',
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConfig.Colors.ButtonColor,
  }
}

class Mapdemo extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

   render() {
    let text = 'Waiting..';
    if (this.state.location == null) {
    	return (<Text>{text} </Text>)
    }
    let lat = this.state.location.coords.latitude
    let lon = this.state.location.coords.longitude
    return (
      <Container>
        <View style={styles.bgstyle}>

          <View style={styles.topContent}>
            <Text> Lorem ipsum dolor sit amet sectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Text>
            <View style={styles.buttonWrap}>
            <Button dark onPress= {this.submit} style= {styles.buttonStyle}>
              <Text>Temp</Text>
            </Button>
            <Button dark onPress= {this.submit} style= {styles.buttonStyle}>
              <Text>Temp</Text>
            </Button>
            </View>
          </View>
          <View style={styles.map}>
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          </View>

        </View>

      </Container>
      
    );
  }
}

export default Mapdemo
