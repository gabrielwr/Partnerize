import { ClimbingPartnerFinder } from './app/components/App'

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAURCLQHPFsI_Qq4xwWAlojh-mDTT140UI",
  authDomain: "climbingpartnerfinder-3408a.firebaseapp.com",
  databaseURL: "https://climbingpartnerfinder-3408a.firebaseio.com",
  projectId: "climbingpartnerfinder-3408a",
  storageBucket: "climbingpartnerfinder-3408a.appspot.com",
  messagingSenderId: "411324617562"
};

firebase.initializeApp(config);


// // Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class ClimbingPartnerFinder extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('ClimbingPartnerFinder', () => ClimbingPartnerFinder);
