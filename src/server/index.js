const express = require('express');
const socketio = require('socket.io');
const app = express();

const server = app.listen(3000, () => console.log('listening on port 3000'));
const websocket = socketio(server);

// Mapping objects to easily map sockets and users.
const clients = {};
const users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
const chatId = 1;

websocket.on('connection', socket => {
  clients[socket.id] = socket;
  socket.on('userJoined', userId => onUserJoined(userId, socket));
  socket.on('message', message => onMessageReceived(message, socket));
});

//next four functions used to be non arrow functions, make
// sure sockets aren't operating using this context

// Event listeners.
// When a user joins the chatroom.
const onUserJoined = (userId, socket) => {
  // console.log('in onUserJoined, userId', userId, 'socket', socket);
  try {
    // The userId is null for new users.
    if (!userId) {
      // const user = db.collection('users').insert({}, (err, user) => {
      //   socket.emit('userJoined', user._id);
      //   users[socket.id] = user._id;
      //   _sendExistingMessages(socket);
      // });
    } else {
      users[socket.id] = userId;
      _sendExistingMessages(socket);
    }
  } catch (err) {
    console.err(err);
  }
};

// When a user sends a message in the chatroom.
const onMessageReceived = (message, senderSocket) => {
  console.log('checking message:', message);
  const userId = users[senderSocket.id];

  // if no id on socket, don't send message
  if (!userId) return;

  _sendMessage(message, senderSocket);
};

// Helper functions.
// Send the pre-existing messages to the user that just joined.
const _sendExistingMessages = socket => {
  // var messages = db.collection('messages')
  //   .find({ chatId })
  //   .sort({ createdAt: 1 })
  //   .toArray((err, messages) => {
  //     // If there aren't any messages, then return.
  //     if (!messages.length) return;
  //     socket.emit('message', messages.reverse());
  // });
};

// Save the message to the db and send all sockets but the sender.
const _sendMessage = (message, socket, fromServer) => {
  //used to insert to db
  const messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };
  const emitter = fromServer ? websocket : socket.broadcast;
  emitter.emit('message', [message]);

  // db.collection('messages').insert(messageData, (err, message) => {
  //   // If the message is from the server, then send to everyone.
  // });
};

// Allow the server to participate in the chatroom through stdin.
const stdin = process.openStdin();
stdin.addListener('data', message => {
  console.log('stdin event', message.toString());
  //this used to be non-arrow function, does that matter?
  _sendMessage(
    {
      text: message.toString().trim(),
      createdAt: new Date(),
      user: { _id: 'robot' }
    },
    null, //no socket
    true //send from server
  );
});
