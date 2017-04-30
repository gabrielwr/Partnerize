//React Imports
import React from 'react';
import { StackNavigator } from 'react-navigation';
import {
  AppRegistry,
  View,
  Animated
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
  H1
} from 'native-base';

import { FadeInView } from './Fade'
//Socket client
import SocketIOClient from 'socket.io-client';

export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.socket = SocketIOClient('http://localhost:3000');
  }

  componentDidMount() {
    //socket init


  }

  static navigationOptions = {
    title: 'Home',
  };


    render() {
      const { navigate } = this.props.navigation;
        return (
            <Container style={{ flexDirection:'column', justifyContent:'center', backgroundColor: 'skyblue', alignItems:'center' }}>
                <Content style={{ flexDirection:'column', alignSelf:'center' }}>
                  <Container style={{height:500, justifyContent:'center'}}>
                    <Thumbnail style={{alignSelf:'center'}} size={200} source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/31528-200.png'}} />
                    <H1>Partnerize!</H1>
                  </Container>
                </Content>
                <Footer>
                    <FooterTab style={{ backgroundColor:'steelblue', padding:0}}>
                        <Button style={{padding:0}}
                          onPress={() => navigate('AllPartners')}
                           full>
                            <Text style={{color:'black'}}>Find a Climbing Partner!</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
