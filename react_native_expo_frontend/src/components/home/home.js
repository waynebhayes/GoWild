import * as Expo from "expo";
import moment from "moment";
import React, { Component } from 'react';
import { Pedometer } from "expo";
import { Container, Content, Drawer, Header, Left, Right, Body, Text, Title, Button, Card, CardItem, Form, Item, Input, Label  } from 'native-base';
import { Actions } from 'react-native-router-flux'
import { logout } from '../../actions/logActions'
import { getSyncStartDate, syncMovement } from '../../actions/syncActions'
import Sidebar from '../sidebar/sidebar'
import Hamburger from '../hamburger/hamburger'
import { connect } from 'react-redux'
import { View, ImageBackground, Image,TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';
import AppConfig from '../../../config.js'

const styles = {
  h1: {
    fontSize: 40
  },
  bgstyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    backgroundPosition: 'center bottom'
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
  iconContainer: {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  outerContainer: {
    flex: 1,
    padding: 10
  },
  barContainer: {
    width: '100%',
    color: AppConfig.Colors.ProgressBar
  },
  barStyle: {
    marginBottom: 20
  },
  imageRow: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  }
};

class Home extends Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  // componentDidMount() {
  //   this._subscribe();
  //   if (this.props.syncStartDate == null) {
  //     this.props.getSyncStartDate();
  //   } else {
  //     this.syncDate().then((ret) => {
  //       this.props.syncMovement(ret);
  //     })
  //   }
  // }
  // componentDidUpdate() {
  //   if (this.props.syncStartDate == null) {
  //     this.props.getSyncStartDate();
  //   } else {
  //     this.syncDate().then((ret) => {
  //       this.props.syncMovement(ret);
  //     })
  //   }
  // }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  async syncDate() {
    const start = moment(this.props.syncStartDate);
    const end = moment();

    const days = moment.duration(end.diff(start)).asDays();
    const dateArray = [];
    for (let i = 0; i < days; i ++) {
      let temp = moment(start).add(i, "days");
      dateArray.push(temp);
    }
    dateArray.push(end);

    let result = dateArray.map(async(value) => { 
      let yesterday = moment(value);
      if (value.get("hour") == 0) {
        yesterday = moment(value).subtract(1, "days");
      } else {
        yesterday = yesterday.startOf('day');
      }

      const ret = await Pedometer.getStepCountAsync(yesterday.toDate(), value.toDate());
      ret.start_time = moment(yesterday).format();
      ret.end_time = moment(value).format();
      return ret;
    });
    const resolvedFinalArray = await Promise.all(result); // resolving all promises
    return resolvedFinalArray;
  };

  gotoline = () => {
    Actions.Linechart();
  }

  gotoring = () => {
    Actions.Ringchart();
  }

  gotobar = () => {
    Actions.Barchart();
  }

  logout = () => {
    this.props.onLogoutClick(this.props.token)
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

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <Container>
        <ImageBackground source={require("../../../assets/images/homebg.png")} style={styles.bgstyle}>
        <Drawer ref={(ref) => { this.drawer = ref}} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} > 
          <Header style={styles.headerStyle}>
            <Left>
               <TouchableOpacity onPress= {this.openDrawer}>
                <Hamburger/>
               </TouchableOpacity>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.outerContainer}>
            <View style={styles.barStack}>
              <View style={styles.barContainer}>
                <Text>Bear</Text>
                <Progress.Bar progress={0.3} width={200} height={15} width={null}
                 color={'rgba(255, 255, 255, 1)'} borderWidth={1}
                 style={styles.barStyle} />
              </View>
              <View style={styles.barContainer}>
                <Text>User_name</Text>
                <Progress.Bar progress={0.3} width={200} height={15}  width={null}
                 color={'rgba(255, 255, 255, 1)'} borderWidth={1}
                 style={styles.barStyle} />
              </View>

            </View>
            <View style={styles.iconContainer}>
              <View style={styles.imageRow}>
                <Image source={require("../../../assets/images/bear.png")}/>
                <Image source={require("../../../assets/images/user.png")}/>
              </View>
            </View>
          </View>
        </Drawer>
        </ImageBackground>
      </Container>
    );
  }
}

Expo.registerRootComponent(Home);

const mapStateToProps = (state) => {
  return { 
    token: state.loginReducer.token,
    syncStartDate: state.syncReducer.lastLoginDate
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onLogoutClick: (token) =>{
      dispatch(logout(token))
    },
    getSyncStartDate: () => {
      dispatch(getSyncStartDate())
    },
    syncMovement: (ret) => {
      dispatch(syncMovement(ret))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
