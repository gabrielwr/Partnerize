
// import * as firebase from 'firebase';

// export class Message extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       messages: [],
//       userId: null
//     }

//     //class method binding
//     this.onSend = this.onSend.bind(this);
//   }

//   onAvatarPress() {
//     console.log('made it here')
//     this.props.navigation.navigate('User');
//   }

//   onSend(messages = []) {
//     this.setState( previousState => {
//       return {
//         messages: GiftedChat.append(previousState.messages, messages),
//       }
//     });
//   }

//   render() {

//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={this.onSend}
//         user={{
//           _id: 1,
//         }}
//         onClick={this.onAvatarPress}
//       />
//     );
//   }
// }


import React from 'react';
// import io from 'socket.io-client/socket.io'
import SocketIOClient from 'socket.io-client';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const USER_ID = '@userId';

export class Message extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      messages: [],
      userId: null
    };

    this.determineUser = this.determineUser.bind( this );
    this.onReceivedMessage = this.onReceivedMessage.bind( this );
    this.onSend = this.onSend.bind( this );
    this._storeMessages = this._storeMessages.bind( this );

    this.socket = SocketIOClient( 'http://localhost:3000' );
    this.socket.on( 'message', this.onReceivedMessage );
  }

  componentDidMount() {
    this.determineUser();
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user.name}`,
  });


  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem( USER_ID )
      .then( userId => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit( 'userJoined', null );
          this.socket.on( 'userJoined', userId => {
            AsyncStorage.setItem( USER_ID, userId) ;
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch( e => alert( e ) );
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage ( messages ) {
    this._storeMessages( messages );
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend( messages = [] ) {
    this.socket.emit( 'message', messages[0] );
    this._storeMessages( messages );
  }

  render() {
    const { navigate } = this.props.navigation;
    var user = { _id: this.state.userId || -1 };

    return (
      <GiftedChat
        messages={ this.state.messages }
        onSend={ this.onSend }
        user={{
            _id: 2,
            name: 'Pim',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }}
      />
    );
  }

  // Helper functions
  _storeMessages( messages ) {
    this.setState( previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
}





