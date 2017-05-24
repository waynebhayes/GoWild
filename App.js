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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BarChart } from './BarChart';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'START',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
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
        </BackgroundImage>
      </View>
    );
  }
}

class RankingScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: 'RANKING',
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;

    var customData = require('./customData.json');
    var user_names = customData.user_name;
    var user_distances = customData.user_distance;

    //const numbers = [1, 2, 3, 4, 5];
    let names = customData.name.map((name, i) => {
      return ( <View key={i} style={{flex: 1}}><Text>{name}</Text></View> ); }
     );
    let icons = customData.icon.map((icon, i) => {
      return ( <View key={i} style={{flex: 1}}><Text>{icon}</Text></View> ); }
    );
    let distances = customData.distance.map((distance, i) => {
      return ( <View key={i} style={{flex: 1}}><Text>{distance}</Text></View> ); }
    );


    return (
      <View style={{flex: 1}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
          {names}{icons}{distances}
        </BackgroundImage>
        </View>
    );

    // https://medium.com/@lennyboyatzis/run-rabbit-run-path-tracking-with-react-native-and-the-geolocation-api-299227a9e241

  }
}

class CatchItScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: 'CATCH IT!',
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <ScrollView horizontal='True' style={{width: '100%', height:'100%'}}>
        <Image style={{width: 1949}} source={require('./images/background.png')} />
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
        return (
            <Image source={require('./images.background.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
  button: {
     width: '50%',
     padding: 10,
     margin: 10,
     alignItems: 'center',
     backgroundColor: '#ddf1fa',
     borderRadius: 50,
  },
  button_text: {
     textAlign: 'center',
     alignItems: 'center',
     color: '#3a7580',
     fontSize: 18,
  },
  main_title: {
     textAlign: 'center',
     color: '#fff',
     fontSize: 50,
     backgroundColor: '#3a7580',
  },
  sub_title: {
     textAlign: 'center',
     color: '#000',
     fontSize: 30,
     backgroundColor: '#fff',
  },
  backgroundImage: {
     alignItems: 'center',
     flex: 1,
     width: null,
     height: null,
     resizeMode: 'cover'
  },
  text: {
     textAlign: 'center',
     color: 'white',
     backgroundColor: 'rgba(0,0,0,0)',
     fontSize: 32
  },
});

const GoWild = StackNavigator({
  Home: { screen: HomeScreen },
  Ranking: { screen: RankingScreen },
  CatchIt: { screen: CatchItScreen },
  Achievements: { screen: AchievementsScreen },
  Learnings: { screen: BarChart },
  Settings: { screen: SettingsScreen },
  About: { screen: AboutScreen },
});

AppRegistry.registerComponent('GoWild', () => GoWild);