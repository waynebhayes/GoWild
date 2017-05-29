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
  Dimensions,
  Animated
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { RankingScreen } from './RankingScreen';
import { MapScreen, AnimalScreen } from './MapScreen';

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
        <BackgroundImage name="./images/background.png">
            <ScrollView style={{width: '100%', height:'100%'}}>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Ranking', { user: 'Remo' })}>
               <Text style={styles.button_text}>RANKING</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigate('Map', { user: 'Remo' })}>
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

export class BackgroundImage extends React.Component {
    render() {

        var styles = require('./styles');
        var xx = this.props.name;
        var xx = './images/background.png';
        return (
            <Image source={require('./images/background.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}
            </Image>
        )
    }
}

const GoWild = StackNavigator({
  Home: { screen: HomeScreen },
  Ranking: { screen: RankingScreen },
  Map: { screen: MapScreen },
  Animal: { screen: AnimalScreen },
  Achievements: { screen: AchievementsScreen },
  Learnings: { screen: LearningsScreen },
  Settings: { screen: SettingsScreen },
  About: { screen: AboutScreen },
});

AppRegistry.registerComponent('GoWild', () => GoWild);