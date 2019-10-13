import React, { Component } from 'react';
import { Dimensions, View, TouchableOpacity, FlatList, ScrollView, Image, TextInput} from 'react-native'
import { Container, Content, Header, Left, Right, Body, Text, Title, Button, Drawer} from 'native-base';
import { LineChart } from 'react-native-chart-kit'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Sidebar from '../sidebar/sidebar'
import Hamburger from '../hamburger/hamburger'
import AppConfig from '../../../config.js'

const styles = {
  h1: {
    fontSize: 40
  },
  bgstyle: {
    flex: 1,
    backgroundColor: AppConfig.Colors.Background
  },
  headerStyle: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0
  },
  barStack: {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
  },
  coverStyle: {
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    padding:20
  },
  avatarWrap: {
    borderRadius: 110,
    padding: 10,
    borderWidth: 1,
    borderColor: AppConfig.Colors.BorderAvatar,
    marginBottom: 20
  },
  logoStyle: { 
    height: 110, 
    width: 110,
    borderRadius: 40
  },
  profileContent: {
    width: '100%',
    borderRadius: 5,
    borderColor: AppConfig.Colors.Translucent,
    backgroundColor: AppConfig.Colors.MoreTranslucent,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10
  },
  profileItem: {
    borderBottomWidth: 2,
    borderBottomColor: AppConfig.Colors.Translucent,
    justifyContent: 'space-between'
  },
  fullButton: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: AppConfig.Colors.ButtonColor
  }
};

class Profile extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => { 
    this.drawer._root.open() 
  }

  navigator = (target) => { 
    Actions[target]();
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <Container>
      <View style={styles.bgstyle}>
        <Drawer ref={(ref) => { this.drawer = ref}} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} > 
          <Header style={styles.headerStyle}>
            <Left>
               <TouchableOpacity onPress= {this.openDrawer}>
                <Hamburger/>
               </TouchableOpacity>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right />
          </Header>
        <Content contentContainerStyle={styles.coverStyle}>
          <View style={styles.avatarWrap}>
          <Image
            style={styles.logoStyle}
            source={require("../../../assets/images/bear.png")}
          />
          </View>
          <Content style={styles.profileContent}>
            <View style={styles.profileItem}>
              <View><Text>Name:</Text></View>
              <View><TextInput>Bear</TextInput></View>
            </View>
            <View style={styles.profileItem}>
              <View><Text>Intro of myself:</Text></View>
              <View><TextInput>Hello</TextInput></View>
            </View>
            <View>
              <View><Text>xxxxx</Text></View>
              <View><Text>xxxxxxxxxxxxxxxx</Text></View>
            </View>
          </Content>
          <Button style={styles.fullButton}>
            <Text>Change password</Text>
          </Button>
        </Content>
        </Drawer>
        </View>
      </Container>
    );
  }
}

export default Profile
