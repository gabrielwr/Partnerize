import React, { Component } from 'react';

import {
  Category,
  CategoryValue,
  ImageWrapper,
  ProfileWrapper,
  ProfileImage,
  Row
} from './styled';

import PlaceholderImage from '../../img/Gabe.png';

class UserProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user.Name}'s Profile`
  });

  render() {
    const { user } = this.props.navigation.state.params;
    const profileInfo = Object.keys(user);
    return (
      <ProfileWrapper>
        <ImageWrapper>
          <ProfileImage source={PlaceholderImage} />
        </ImageWrapper>
        {profileInfo.length &&
          profileInfo.map((key, idx) => {
            const isLast = idx === profileInfo.length - 1;
            return (
              <Row key={key} withBorder={!isLast}>
                <Category> {key} </Category>
                <CategoryValue>{user[key]}</CategoryValue>
              </Row>
            );
          })}
      </ProfileWrapper>
    );
  }
}

export default UserProfile;
