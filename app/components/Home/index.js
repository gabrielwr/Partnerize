import React from 'react';
import { FadeInView } from '../../elements/Fade';
import AppLogo from '../../img/boulderer.png';

import {
  Button,
  Content,
  CenteredText,
  CenteredLogoText,
  Footer,
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
            <Button onPress={() => navigate('AllPartners')}>
              <CenteredText>Find A Climbing Partner!</CenteredText>
            </Button>
        </Footer>
      </HomeScreenWrapper>
    );
  }
}

export default HomeScreen;
