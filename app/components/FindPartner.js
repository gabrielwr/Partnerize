import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

export class FindPartner extends React.Component {
  static navigationOptions = {
    title: 'Find a climbing partner!',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, ready to find a climbing partner?</Text>
        <Button
            onPress={() => navigate('AllPartners')}
            title="Yes"
          />
        <Button
            onPress={() => navigate('Home')}
            title="No"
          />
      </View>
    )
  }
}
