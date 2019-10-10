import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AppRegistry, Image, StatusBar,View, ScrollView} from "react-native";
import { Container, Content, Text, Title, List, ListItem, Button, Icon} from "native-base";
import AppConfig from '../../../config.js'
// import Icon from 'react-native-vector-icons/FontAwesome';

const routes = ["Home", "Welcome", "Monthly", "Daily", "Login", "Profile", "VariedChart", "Mapdemo"];
const iconMap = {"Home": "home",
                "Welcome": "beer",
                "Monthly": "home",
                "Daily": "home",
                "Login": "people",
                "Profile": "home"}

const styles = {
  fillStyle: {
    backgroundColor: AppConfig.Colors.NavbarBackground
  },
  coverStyle: {
    alignItems: "center",
  },
  list: {
    height: '60%'
  },
  listfill: {
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: AppConfig.Colors.Translucent,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logoStyle: { 
    height: 80, 
    width: 80,
    borderRadius: 40
  },
  avatarWrap: {
    borderRadius: 45,
    padding: 5,
    borderWidth: 1,
    borderColor: AppConfig.Colors.BorderAvatar
  },
  selectButton: {
    marginTop: 20
  },
  navButton: {
    color: AppConfig.Colors.TextColorLight
  },
  listinner: {
    width: "100%"
  }
};

class Sidebar extends Component {
  render() {
    return (
      <Container style={styles.fillStyle}>
        <Content contentContainerStyle={styles.coverStyle}>
        <View style={styles.avatarWrap}>
          <Image
            style={styles.logoStyle}
            source={require("../../../assets/images/bear.png")}
          />
          </View>
          <Title>Step count</Title>
          <Button full style={styles.selectButton} onPress={() => this.props.navigator("Animals")}>
            <Icon name='add'/>
            <Text>Choose Animal</Text>
          </Button>
        </Content>
        <View style={styles.list}>
          <List style={styles.listinner}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem style={styles.listfill} button onPress={() => this.props.navigator(data)}> 
                  <Icon name={iconMap[data]} style={styles.navButton}/>
                  <Text>{data}</Text>
                  <Text></Text>
                </ListItem>
              );
            }}
          />
        </View>
      </Container>
    );
  }
}

export default Sidebar
