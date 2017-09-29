//React Imports
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { FadeInView } from './Fade'

import {
  Container,
  Content,
  Button,
  Text,
  H1
} from 'native-base';


export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
      return (
          <Container style={ styles.container1 }>
              <Content style={ styles.content }>
              <FadeInView>
                <Container style={ styles.container2  }>
                  <Image style={ styles.image } source={ require('../../img/boulderer.png') } />
                  <H1 style={ styles.H1 }>Partnerize!</H1>
                </Container>
              </FadeInView>
              </Content>
                <Button style={ styles.button } primary iconLeft onPress={() => navigate('AllPartners')}
                    full>
                  <Text>Find A Climbing Partner!</Text>
                </Button>
          </Container>
      );
  }
}


const styles = StyleSheet.create({
  container1: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  container2: {
    height: 500,
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 10
  },
  H1: {
    alignSelf:'center'
  },
  button: {
    height: 50
  }
})
