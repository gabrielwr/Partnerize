import styled from 'styled-components';

export const ProfileWrapper = styled.View`
  flex: 1;
  background-color: white;
`;

export const ImageWrapper = styled.View`
  background-color: lightskyblue;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.Image`
  border-radius: 50;
  margin-bottom: 20;
  height: 200;
  width: 200;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: dodgerblue;
  border-bottom-width: ${props => props.withBorder ? 1 : 0};
  border-color: white;
`;

export const Category = styled.Text`
  fontWeight: bold;
  width: 130;
  marginLeft: 10;
  color: white;
`;

export const CategoryValue = styled.Text`
  paddingVertical: 20;
  paddingLeft: 15;
  color: white;
`;
