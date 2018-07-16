import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

//Component imports
import HomeScreen  from './components/Home'
import { AllPartners } from './components/AllPartners'
import { Message } from './components/Message'
import { User } from './components/User'

export const App = StackNavigator({
  Home: { screen: HomeScreen },
  AllPartners: { screen: AllPartners },
  Message: { screen: Message },
  User: { screen: User }
});

AppRegistry.registerComponent('partnerize', () => App);
