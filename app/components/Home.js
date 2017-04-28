//React Imports
import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

//Socket client
import SocketIOClient from 'socket.io-client';

//firebase imports
import { firebaseApp } from '../../index.ios'



export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.socket = SocketIOClient('http://localhost:3000');

    //creates realtime database reference as property
    this.dbRef = firebaseApp.database().ref();
  }

  componentDidMount() {
    //socket init
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
            onPress={() => navigate('AllPartners')}
            title="Find a Climbing Partner!"
          />
        <Button
            onPress={() => navigate('Geolocator')}
            title="Test Geolocator"
          />
      </View>
    )
  }
}
