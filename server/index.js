const express = require('express');
const http = require('http')
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
const clients = {};
const users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
const chatId = 1;

websocket.on('connection', socket => {
    clients[socket.id] = socket;
    // socket.on('userJoined', (userId) => onUserJoined(userId, socket));
    socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
// function onUserJoined(userId, socket) {
//   console.log('onUserJoined')
//   try {
//     // The userId is null for new users.
//     if (!userId) {
//       // const user = db.collection('users').insert({}, (err, user) => {
//       //   socket.emit('userJoined', user._id);
//       //   users[socket.id] = user._id;
//       //   _sendExistingMessages(socket);
//       // });
//     } else {
//       users[socket.id] = userId;
//       _sendExistingMessages(socket);
//     }
//   } catch(err) {
//     console.err(err);
//   }
// }

// When a user sends a message in the chatroom.
function onMessageReceived(message, senderSocket) {
  const userId = users[senderSocket.id];

  // if no id on socket, don't send message
  if (!userId) return;

  _sendMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  // var messages = db.collection('messages')
  //   .find({ chatId })
  //   .sort({ createdAt: 1 })
  //   .toArray((err, messages) => {
  //     // If there aren't any messages, then return.
  //     if (!messages.length) return;
  //     socket.emit('message', messages.reverse());
  // });
}

// Save the message to the db and send all sockets but the sender.
function _sendMessage(message, socket, fromServer) {
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
}

// Allow the server to participate in the chatroom through stdin.
const stdin = process.openStdin();
stdin.addListener('data', function(message) {
  _sendMessage(
    { text: message.toString().trim(), createdAt: new Date(), user: { _id: 'robot' } },
    null, //no socket
    true //send from server
  );
});
