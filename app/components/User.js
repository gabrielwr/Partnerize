import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export class User extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user.name}'s Profile`,
  });

  render() {
    console.log(this.props)
    const { navigate } = this.props.navigation;
    return (
      <View>

      </View>
    )
  }
}
