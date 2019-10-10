import { SecureStore } from 'expo';
import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { View, ImageBackground } from 'react-native'

const styles = {
  h1: {
    fontSize: 40
  },
  bgstyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  contentStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 40, 
    paddingHorizontal: 10
  },
  buttonStyle: {
    backgroundColor:'#008C79D9', 
    marginTop: 40
  }
};


class Welcome extends Component {
  componentDidMount() {
    SecureStore.getItemAsync("Token").then(function (token) {
      if (token != null ) {
        Actions.Home();
      }
    });
  }
 
  render() {
    return (
      <Container>
        <ImageBackground source={require("../../../assets/images/background.png")} style={styles.bgstyle}>

        <Content contentContainerStyle ={styles.contentStyle}>
          <View>
            <Text style={styles.h1}>NAME</Text>
          </View>
          <Button block onPress= {() =>{ Actions.Login();}} style= {styles.buttonStyle}>
            <Text>Login</Text>
          </Button>
          <Button dark block onPress= {() =>{ Actions.Register();}} style= {styles.buttonStyle}>
            <Text>Register</Text>
          </Button>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}
export default Welcome;
