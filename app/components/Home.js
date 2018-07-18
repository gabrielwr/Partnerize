import React from 'react';
import { Image } from 'react-native';
import { FadeInView } from './Fade';

import {
  connectStyle,
  Container,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  H1
} from 'native-base';

export class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigation: { navigate }, style } = this.props;

    return (
      <Container style={ style.containerMain }>
        <Content style={ style.content }>
          <FadeInView>
            <Container style={ style.containerSecondary  }>
              <Image style={ style.image } source={ require('../img/boulderer.png') } />
              <H1 style={ style.title }>Partnerize!</H1>
            </Container>
          </FadeInView>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              primary
              iconLeft
              onPress={() => navigate('AllPartners')}
              full
            >
              <Text style={style.text}>Find A Climbing Partner!</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

// Not using stylesheet create due to native base
const styles = {
  containerMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  containerSecondary: {
    height: 500,
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 10
  },
  title: {
    alignSelf: 'center'
  },
  text: {
    color: 'white'
  },
}

export default connectStyle('namespace.HomeScreen', styles)(HomeScreen);
