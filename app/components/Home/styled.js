import styled from 'styled-components';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  backgroundColor: lightskyblue;
  alignItems: center;
`;

export const Content = styled.View`
  flexDirection: column;
  alignSelf: center;
`;

export const LogoWrapper = styled.View`
  backgroundColor: transparent;
  height: 500;
  justifyContent: center;
`;

export const Image = styled.Image`
  alignSelf: center;
  height: 150;
  width: 150;
  borderRadius: 10;
`;

export const CenteredText = styled.Text`
  text-align: center;
  color: white;
  font-size: 16;
`;

export const CenteredLogoText = CenteredText.extend`
  font-size: 24;
  color: black;
`;
