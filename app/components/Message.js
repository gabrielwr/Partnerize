import React from 'react';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const USER_ID = '@userId';

export class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      userId: null
    };


    this.socket = io( 'http://localhost:3000', { jsonp: false });
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
  determineUser = () => {
    AsyncStorage.getItem( USER_ID )
      .then( userId => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit( 'userJoined', null );
          this.socket.on( 'userJoined', userId => {
            AsyncStorage.setItem( USER_ID, userId ) ;
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
  onReceivedMessage = ( messages ) => {
    this._storeMessages( messages );
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend = ( messages = [] ) => {
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
  _storeMessages = ( messages ) => {
    this.setState( previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
}
