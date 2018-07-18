import React from 'react';
import { createStackNavigator } from 'react-navigation';

//Component imports
import HomeScreen  from './app/components/Home'
import { AllPartners } from './app/components/AllPartners'
import { Message } from './app/components/Message'
import { User } from './app/components/User'

export default createStackNavigator({
  Home: { screen: HomeScreen },
  AllPartners: { screen: AllPartners },
  Message: { screen: Message },
  User: { screen: User }
});
