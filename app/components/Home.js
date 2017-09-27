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
          <Container style={{ flexDirection:'column', justifyContent:'center', backgroundColor: 'lightskyblue', alignItems:'center' }}>
              <Content style={{ flexDirection:'column', alignSelf:'center' }}>
              <FadeInView>
                <Container style={{ height:500, justifyContent:'center' }}>
                  <Image style={{ alignSelf:'center', height:150, width: 150, borderRadius:10 }} source={ require('../../img/boulderer.png') } />
                  <H1 style={{ alignSelf:'center' }}>Partnerize!</H1>
                </Container>
              </FadeInView>
              </Content>
                <Button style={{ height:50 }} primary iconLeft onPress={() => navigate('AllPartners')}
                    full>
                  <Text>Find A Climbing Partner!</Text>
                </Button>
          </Container>
      );
  }
}
