import React from 'react';
import { FadeInView } from '../../elements/Fade';
import AppLogo from '../../img/boulderer.png';

import {
  Button,
  Footer,
  FooterTab,
} from 'native-base';

import {
  Content,
  CenteredText,
  CenteredLogoText,
  HomeScreenWrapper,
  Image,
  LogoWrapper,
} from './styled';

export class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <HomeScreenWrapper>
        <Content>
          <FadeInView>
            <LogoWrapper>
              <Image source={ AppLogo } />
              <CenteredLogoText>Partnerize!</CenteredLogoText>
            </LogoWrapper>
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
              <CenteredText>Find A Climbing Partner!</CenteredText>
            </Button>
          </FooterTab>
        </Footer>
      </HomeScreenWrapper>
    );
  }
}

export default HomeScreen;
