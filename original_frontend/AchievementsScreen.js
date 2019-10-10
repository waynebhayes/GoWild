import React from 'react';
import {Animated, Component, View, StyleSheet, Text, Image, Dimensions, ScrollView} from 'react-native'

export class AchievementsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ACHIEVEMENTS',
  });

  constructor () {
    super()

    // initialization for animation
    var customData = require('./customData.json');
    var numberOfAnimals = customData.animals.length;
    var initialValues = [];
    for (i = 0; i < numberOfAnimals; i++) {
        initialValues.push(new Animated.Value(20));
    }
    this.state = {
      values: initialValues
    }
  }

  handeleAnimation () {
    var customData = require('./customData.json');
    var distances = [];
    var maxDistance = 0;
    const timing = Animated.timing

    let animals = customData.animals.map((animal, i) => {
      distances.push(animal.distance);});
    for (i = 0; i < customData.animals.length; i++) {
      currDistance = parseInt(distances[i]);
      if (currDistance>maxDistance) {
        maxDistance=currDistance;}
    }
    Animated.parallel(animals.map((animal, i) => {
      var window = Dimensions.get('window');
      screenWidth = window.width-40;
      newWidth = screenWidth*parseInt(distances[i])/maxDistance;
      return timing(this.state["values"][i], {toValue: newWidth, duration: 3000, delay: 500})
    })).start()
  }

  render () {
   const values = this.state.values
   var styles = require('./styles');
   this.handeleAnimation();

    var customData = require('./customData.json');
    let animals = customData.animals.map((animal, i) => {
      return (
      <View key={i}>
        <Text style={styles.ranking_text}>{animal.name}</Text>
        <Animated.View style={[styles.bar, {width: values[i]}]} />
      </View> ); }
    );

    return (
      <View style={{flex: 1}}>
        <Text style={styles.main_title}>GO WILD!</Text>
        <BackgroundImage>
                    <ScrollView style={{width: '100%', height:'100%'}}>
                    <View style={{alignItems:'flex-start'}}>
          {animals}
          </View>
          </ScrollView>
        </BackgroundImage>
        </View>
    );

  }

  }

class BackgroundImage extends React.Component {
    render() {

        var styles = require('./styles');
        return (
            <Image source={require('./images/background_clouds.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}
            </Image>
        )
    }
}




