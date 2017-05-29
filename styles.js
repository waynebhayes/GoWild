'use strict';

var React = require('react-native');

var styles = React.StyleSheet.create({
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
     resizeMode: 'cover',
     padding: 20
  },
  animalImage: {
       alignItems: 'center',
       flex: 1,
       resizeMode: 'stretch'
    },
  text: {
     textAlign: 'center',
     color: 'white',
     backgroundColor: 'rgba(0,0,0,0)',
     fontSize: 32
  },
  ranking_text: {
       textAlign: 'left',
       color: 'white',
       backgroundColor: 'rgba(0,0,0,0)',
       fontSize: 32
  },
    bar: {
      alignSelf: 'flex-start',
      borderRadius: 10,
      height: 20,
      backgroundColor: '#FFFFFF',
    }
})

module.exports = styles;