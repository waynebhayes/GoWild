import * as Expo from "expo";
import moment from "moment";
import React, { Component } from 'react';
import { Pedometer } from "expo";
import { Container, Content, Drawer, Header, Left, Right, Body, Text, Title, Button, Card, CardItem, Form, Item, Input, Label, List, ListItem  } from 'native-base';
import { Actions } from 'react-native-router-flux'
import {login, logout} from '../../actions/logActions'
import { getSyncStartDate, syncMovement } from '../../actions/syncActions'
import { getAnimalInfo, adoptAnimal, getMyAnimalInfo } from '../../actions/animalActions'
import Sidebar from '../sidebar/sidebar'
import Hamburger from '../hamburger/hamburger'
import { connect } from 'react-redux'
import { View, ImageBackground, Image,TouchableOpacity, FlatList } from 'react-native'
import * as Progress from 'react-native-progress';
import Window from './window.js';

import AppConfig from '../../../config.js'

import {SecureStore} from "expo";

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
  listItem: {
    width:"42.5%",
    boxSizing: 'border-box',
    borderWidth: 1,
    borderColor: AppConfig.Colors.BorderAnimal,
    padding: 5,
    marginLeft: "5%",
    marginBottom: "5%"
  },
  listImage: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listText: {
    textAlign: 'center'
  },
  listButton: {
    backgroundColor: AppConfig.Colors.ButtonColor,
    marginTop: 5
  },

};

class Animals extends Component {
    state = {
        animals: [],
        alertDisplay: false
    };
    componentDidMount= () => {
        this.props.onInit()
    }

    componentDidUpdate = () => {
        if (this.props.adoptAnimalSuccess == "true" && this.state.alertDisplay == false) {
            this.setState({ alertDisplay: true });
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    }

    navigator = (target) => {
        Actions[target]();
    }

    getAnimalDescription = () => {
        console.log("animal list here")
        console.log( this.props.animalList)
        console.log( this.props.animalList.length)
        console.log( this.props.animalList[0])
        console.log( this.props.animalList[0]["image_url"])
        return
    }

    choseAnimal = (event, animal_id) => {
      console.log("choosed:"+animal_id)
        this.props.onAnimalChose(animal_id)
    }

    doneChoseAnimal = () => {
      this.props.doneAnimalChose()
    }

    printMyAnimalInfo = () => {
        this.props.onMyAnimalInfo()
        console.log( this.props.myAnimalInfo)
    }

    closeWindow = () => {
      this.setState({ alertDisplay: false });
    }


    render() {
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
              <Title>Animals</Title>
            </Body>
            <Right />
          </Header>
          { this.state.alertDisplay ? <Window onclick={this.closeWindow}></Window>: null }
          <FlatList
            data={this.props.animalList}
            numColumns={2}
            renderItem={({item}) => {
              return <View style={styles.listItem}>
                  <Image source={{uri: item.image_url}} style={styles.listImage}/>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Button block onPress= {this.getAnimalDescription} style= {styles.listButton}>
                  <Text>View Details</Text>
                  </Button>
                  <Button block onPress={(e) => {this.choseAnimal(e, item.animal_id)}}
                   style= {styles.listButton}>
                  <Text>Select Animal</Text>
                  </Button>
                </View>
              }
            }
            keyExtractor={(item, index) => index.toString()}
          />
            {/*<Button dark block onPress= {this.getAnimalDescription} style= {styles.buttonStyle}>
            </Button>
            <Button dark block onPress= {this.choseAnimal} style= {styles.buttonStyle}>
            </Button>
            <Button dark block onPress= {this.printMyAnimalInfo} style= {styles.buttonStyle}>
            </Button>*/}
        </Drawer>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        animalList: state.animalReducer.animalList,
        myAnimalInfo: state.animalReducer.myAnimalInfo,
        listLoading: state.animalReducer.listLoading,
        adoptAnimalSuccess: state.animalReducer.success
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        onInit: () =>{
          dispatch(getAnimalInfo())
        },
        onAnimalChose:(animal_id) =>{
            dispatch(adoptAnimal(animal_id))
        },
        doneAnimalChose:() => {
          dispatch(adoptAnimalDoneAction())
        },
        onMyAnimalInfo: () =>{
            dispatch(getMyAnimalInfo())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animals)

