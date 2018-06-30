import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Icon } from 'native-base';

export class AllPartnersIcons extends React.Component {

  constructor(props) {
    super(props)
    this.navigate = this.props.navigate
  }

  onUserPress(personObj) {
    this.navigate('User', {
      user: {
        Name: personObj.name,
        'One Arm Pullups': personObj['One Arm Pullups'],
        'Favorite Climbing Area': personObj['Favorite Climbing Area'],
        Distance: personObj.distance + ' Miles'
      }
    })
  }

  render() {
    const { personObj, navigate } = this.props
    return (
      <View style={styles.view}>
        <Icon
          style={{ color: 'dodgerblue' }}
          name='person'
          onPress={ () => this.onUserPress(personObj) }
        />
        <Icon
          style={{ color: 'dodgerblue' }}
          name='chatbubbles'
          onPress={ () => {
            navigate('Message', { user: personObj })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
