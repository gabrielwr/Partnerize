import React from 'react';
import { createStackNavigator } from 'react-navigation';

// Component imports
import HomeScreen from './components/Home';
import { AllPartners } from './components/AllPartners';
import { Message } from './components/Message';
import { User } from './components/User';

export default createStackNavigator({
  Home: { screen: HomeScreen },
  AllPartners: { screen: AllPartners },
  Message: { screen: Message },
  UserProfile: { screen: UserProfile }
});
