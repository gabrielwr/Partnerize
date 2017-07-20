import React from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native';

export class User extends React.Component {

  constructor(props) {
    super(props)

    this.person = this.props.navigation.state.params.user
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user.Name}'s Profile`,
  });



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
        <View style={ styles.profileContainer }>
          <Image size={200} style={ styles.profileImage} source={{uri: 'https://placegoat.com/400/400'} }/>
        </View>
          { Object.keys(this.person).map( key => {
            return (
              <View key={ key } style={ styles.contactRowContainer }>
                <Text style={ [styles.text, styles.contactKey] }> { key } </Text>
                <Text style={ [styles.text, styles.contactValue] }> { this.person[key] } </Text>
              </View>
            )
          })}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 15
  },
  profileText: {
    fontSize: 27,
    fontWeight: '100'
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    marginBottom: 20
  },
  profileContainer: {
    backgroundColor: 'lightskyblue',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  contactRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  contactValue: {
    paddingVertical: 20,
    paddingLeft: 15,
    color: 'white'
  },
  contactKey:{
    fontWeight: 'bold',
    width: 130,
    marginLeft: 10,
    color: 'white'
  },
})
