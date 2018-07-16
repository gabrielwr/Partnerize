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
    // this might need to be "style" instead of style -- possible bug.
    const { navigate, styles } = this.props;

    return (
      <Container style={ styles.containerMain }>
        <Content style={ styles.content }>
          <FadeInView>
            <Container style={ styles.containerSecondary  }>
              <Image style={ styles.image } source={ require('../img/boulderer.png') } />
              <H1 style={ styles.title }>Partnerize!</H1>
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
              <Text style={styles.text}>Find A Climbing Partner!</Text>
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
