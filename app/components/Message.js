import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import SocketIOClient from 'socket.io-client';

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

    // this.socket = SocketIOClient('http://localhost:3000');
  }

  static navigationOptions = {
    title: `Message with placeholder name using props`,
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Do you even lift?',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View>
//         <Text> SUP BRODUDE?! </Text>
//       </View>
//     )
//   }
// }

// socket.on('message', (message) => {
//   var oldMessages = this.state.messages;
//   // React will automatically rerender the component when a new message is added.
//   this.setState({ messages: oldMessages.concat(message) });
// });








