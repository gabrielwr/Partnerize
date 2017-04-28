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
