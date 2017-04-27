
//React Imports
import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

//Component imports
import { FindPartner } from './FindPartner'
import { AllPartners } from './AllPartners'
import { Geolocation } from './Geolocation'
import { Message } from './Message'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
            onPress={() => navigate('Find')}
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

const ClimbingPartnerFinder = StackNavigator({
  Home: { screen: HomeScreen },
  Find: { screen: FindPartner },
  Geolocator: { screen: Geolocation },
  AllPartners: { screen: AllPartners },
  Message: { screen: Message }
});

AppRegistry.registerComponent('ClimbingPartnerFinder', () => ClimbingPartnerFinder);




