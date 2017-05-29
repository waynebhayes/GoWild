import React from 'react';
import {Animated, Component, View, StyleSheet, Text, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native'

export class MapScreen extends React.Component {
   // Nav options can be defined as a function of the screen's props:
   static navigationOptions = {
     title: 'CATCH IT!',
   };

   constructor () {
     super()
     // initialization for animation
     var customData = require('./customData.json');
     var numberOfAnimals = customData.animals.length;
     var initialValues = [];
     for (i = 0; i < numberOfAnimals; i++) {
         initialValues.push(new Animated.Value(200));
     }
     this.state = {
       values: initialValues
     }
     this.springValue = new Animated.Value(0.3);
     this.userValue = new Animated.Value(200);
   }

   spring () {
     this.springValue.setValue(0.3)
     Animated.spring(
       this.springValue,
       {
         toValue: 1,
         friction: 1,
       }
     ).start(() => this.spring());
   }

   render() {
     // The screen's current route is passed in to `props.navigation.state`:
     const { navigate } = this.props.navigation;
     const { params } = this.props.navigation.state;
     var styles = require('./styles');
     var customData = require('./customData.json');
     var maxDistance = 0;
     var screenSize = 1940;
     var isCatchable = []
     var userDistance = parseInt(customData.user.distance);

     for (i = 0; i < customData.animals.length; i++) {
         currDistance = parseInt(customData.animals[i].distance);
         if (Math.abs(currDistance-userDistance) < 10) {
             isCatchable.push(true);
         }
         else {
             isCatchable.push(false);
         }
         if (currDistance>maxDistance) {
         maxDistance=currDistance;
         }
     }
     if (maxDistance<userDistance) {
         maxDistance = userDistance;
     }

     Animated.parallel(customData.animals.map((animal, i) => {
           xPos = 200+((screenSize-400)*parseInt(animal.distance)/maxDistance);
           return Animated.timing(this.state.values[i], {toValue: xPos, duration: 2000, delay: 500})
             })).start()

     this.spring();

     // user walk
     xPos = 200+((screenSize-400)*userDistance/maxDistance);
     this.springValue.setValue(200)
        Animated.timing(
             this.userValue, {toValue: xPos, duration: 2000, delay: 2500}
       ).start();

     let animals = customData.animals.map((animal, i) => {
       if (isCatchable[i]) {
       return (
           <Animated.View style={{position: 'absolute', left: this.state.values[i], width: 100, height: 200, transform: [{scale: this.springValue}]}} key={i}>
              <Image source={require('./images/bear.png')} style={styles.animalImage} />
              <TouchableOpacity onPress={() => navigate('Animal', { user: animal.name })}>

                 <Text style={styles.text}>{animal.name}{"\n"}{animal.distance}</Text>
              </TouchableOpacity>
           </Animated.View>
           );
           }
       else {
             return (
           <Animated.View style={{position: 'absolute', left: this.state.values[i], width: 100, height: 200}} key={i}>
                 <Image source={require('./images/moose.png')} style={styles.animalImage} />
                 <Text style={styles.text}>{animal.name}{"\n"}{animal.distance}</Text>
           </Animated.View> );
       }
     });

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
         <View style={{height:200, position: 'absolute', left: 0, bottom: 0}}>
                       <Animated.View style={{position: 'absolute', left: this.userValue, width: 100, height: 200}} key={i}>
                              <Image source={require('./images/wolf.png')} style={styles.animalImage} />
                             <Text style={styles.text}>{customData.user.name}{"\n"}{customData.user.distance}</Text>
                       </Animated.View>
                       {animals}
         </View>
          </View>
         </ScrollView>
       </View>
     );
   }
 }

 export class AnimalScreen extends React.Component {
     static navigationOptions = ({ navigation }) => ({
       title: `Chat with ${navigation.state.params.user}`,
       });
   render() {
     const { navigate } = this.props.navigation;
         var styles = require('./styles');
      const { params } = this.props.navigation.state;
     return (

       <View style={{flex: 1, flexDirection: 'column',}}>
         <Text style={styles.main_title}>GO WILD!</Text>
         <BackgroundImage>
             <Text>Chat with {params.user}</Text>
         </BackgroundImage>
       </View>
     );
   }
 }

class BackgroundImage extends React.Component {
    render() {

        var styles = require('./styles');
        return (
            <Image source={require('./images/background_forest.png')}
                  style={styles.backgroundImage}>
                  {this.props.children}
            </Image>
        )
    }
}




