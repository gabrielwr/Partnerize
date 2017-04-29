import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import SocketIOClient from 'socket.io-client';
import * as firebase from 'firebase';

//Chat lib
import { GiftedChat } from 'react-native-gifted-chat';

export class Message extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userId: null
    }

    //class method binding
    this.onSend = this.onSend.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user.name}`,
  });

  componentWillMount() {
    console.log(this.props)
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Do you even lift?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onAvatarPress() {
    console.log('made it here')
    this.props.navigation.navigate('User');
  }

  onSend(messages = []) {
    this.setState( previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
        onClick={this.onAvatarPress}
      />
    );
  }
}







