import React from 'react';
import { View } from 'react-native';

import {
  Container,
  Content,
  Spinner,
  List,
  ListItem,
  Text,
  Right,
  Icon,
  Thumbnail,
  Body
} from 'native-base';


export class AllPartnersIcons extends React.Component{
  render() {
    const { personObj, navigate } = this.props
    return (
        <View>
          <Icon
            style={{ color: 'dodgerblue' }}
            name='person'
            onPress={ () => {
              navigate('User', {
                user: {
                  Name: personObj.name,
                  'One Arm Pullups': personObj['One Arm Pullups'],
                  'Favorite Climbing Area': personObj['Favorite Climbing Area'],
                  Distance: personObj.distance + ' Miles'
                }
              })
            }}
          />
        <Right>
          <Icon
            style={{ color: 'dodgerblue' }}
            name='chatbubbles'
            onPress={ () => {
              navigate('Message', { user: personObj })
            }}
          />
        </Right>
      </View>
    )
  }
}
