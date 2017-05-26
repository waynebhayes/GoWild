import React from 'react';
import {
  View,
  AppRegistry,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RankingScreen } from './RankingScreen';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'START',
  };
  render() {
    const { navigate } = this.props.navigation;
    var styles = require('./styles');
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
            <ScrollView style={{width: '100%', height:'100%'}}>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Ranking', { user: 'Remo' })}>
               <Text style={styles.button_text}>RANKING</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('CatchIt', { user: 'Remo' })}>
               <Text style={styles.button_text}>CATCH IT!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Achievements', { user: 'Remo' })}>
               <Text style={styles.button_text}>ACHIEVEMENTS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Learnings', { user: 'Remo' })}>
               <Text style={styles.button_text}>LEARNINGS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Settings', { user: 'Remo' })}>
               <Text style={styles.button_text}>SETTINGS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('About', { user: 'Remo' })}>
               <Text style={styles.button_text}>ABOUT</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </BackgroundImage>
      </View>
    );
  }
}


    // https://medium.com/@lennyboyatzis/run-rabbit-run-path-tracking-with-react-native-and-the-geolocation-api-299227a9e241


class CatchItScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = {
    title: 'CATCH IT!',
  };
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    var styles = require('./styles');
    var customData = require('./customData.json');
    var maxDistance = 0;
    var screenSize = 1000;

    for (i = 0; i < customData.animals.length; i++) {
        currDistance = parseInt(customData.animals[i].distance);
        if (currDistance>maxDistance) {
        maxDistance=currDistance;}
    }

        let animals = customData.animals.map((animal, i) => {

          xPos = 100+((screenSize-200)*parseInt(animal.distance)/maxDistance);
          return (
          <View style={{position: 'absolute', left: xPos, width: 100, height: 100}} key={i}>
            <Text style={styles.text}>{animal.name}{"\n"}{animal.distance}</Text>
          </View> ); }
        );

    return (
      <View style={{flex: 1}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <ScrollView horizontal={true} style={{width: '100%', height:'100%'}}>
        <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}>

        <Image style={{width: screenSize}} source={require('./images/background.png')} />
        <View style={{height:200, position: 'absolute', left: 0, bottom: 0}}>{animals}</View>
         </View>

        </ScrollView>
      </View>
    );
  }
}

class AchievementsScreen extends React.Component {
  static navigationOptions = {
    title: 'ACHIEVEMENTS',
  };
  render() {
    const { navigate } = this.props.navigation;
    var styles = require('./styles');
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
        </BackgroundImage>
      </View>
    );
  }
}

class LearningsScreen extends React.Component {
  static navigationOptions = {
    title: 'LEARNINGS',
  };
  render() {
    const { navigate } = this.props.navigation;
        var styles = require('./styles');
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
        </BackgroundImage>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'SETTINGS',
  };
  render() {
    const { navigate } = this.props.navigation;
        var styles = require('./styles');
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
        </BackgroundImage>
      </View>
    );
  }
}

class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'ABOUT',
  };
  render() {
    const { navigate } = this.props.navigation;
        var styles = require('./styles');
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
        </BackgroundImage>
      </View>
    );
  }
}

class BackgroundImage extends React.Component {
    render() {

            var styles = require('./styles');
        return (
            <Image source={require('./images.background.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}
            </Image>
        )
    }
}

const GoWild = StackNavigator({
  Home: { screen: HomeScreen },
  Ranking: { screen: RankingScreen },
  CatchIt: { screen: CatchItScreen },
  Achievements: { screen: AchievementsScreen },
  Learnings: { screen: LearningsScreen },
  Settings: { screen: SettingsScreen },
  About: { screen: AboutScreen },
});

AppRegistry.registerComponent('GoWild', () => GoWild);