
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
import { HomeScreen } from './components/Home'
import { AllPartners } from './components/AllPartners'
import { Message } from './components/Message'
import { User } from './components/User'

export const ClimbingPartnerFinder = StackNavigator({
  Home: { screen: HomeScreen },
  AllPartners: { screen: AllPartners },
  Message: { screen: Message },
  User: { screen: User }
});

AppRegistry.registerComponent('ClimbingPartnerFinder', () => ClimbingPartnerFinder);
