import { ClimbingPartnerFinder } from './app/components/App'

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVjAa27w482QVu4Li5l8XQNiFUiGXXE5M",
  authDomain: "climbingpartnerfinder-e1f1a.firebaseapp.com",
  databaseURL: "https://climbingpartnerfinder-e1f1a.firebaseio.com",
  projectId: "climbingpartnerfinder-e1f1a",
  storageBucket: "climbingpartnerfinder-e1f1a.appspot.com",
  messagingSenderId: "33681182548"
};

export const firebaseApp = firebase.initializeApp(config);

// // Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');


// this.itemsRef.on('evntExample1', (dataSnapshot) => {
//     this.items.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
//     this.setState({
//       todoSource: this.state.todoSource.cloneWithRows(this.items)
//     });
//   });

//   // When a todo is removed
//   this.itemsRef.on('evntExample2', (dataSnapshot) => {
//       this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
//       this.setState({
//         todoSource: this.state.todoSource.cloneWithRows(this.items)
//       });
//   });
