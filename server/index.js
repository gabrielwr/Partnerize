var express = require('express');
var http = require('http')
var socketio = require('socket.io');
var mongojs = require('mongojs');

// var ObjectID = mongojs.ObjectID;
// var db = mongojs(process.env.MONGO_URL || 'mongodb://localhost:27017/local');
var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

// Mapping objects to easily map sockets and users.
var clients = {};
var users = {};

// This represents a unique chatroom.
// For this example purpose, there is only one chatroom;
var chatId = 1;

websocket.on('connection', (socket) => {
    console.log('connection occurred')
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
//       // var user = db.collection('users').insert({}, (err, user) => {
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
  var userId = users[senderSocket.id];
  console.log(message.text)
  // Safety check.
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
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };
    var emitter = fromServer ? websocket : socket.broadcast;
    emitter.emit('message', [message]);

  // db.collection('messages').insert(messageData, (err, message) => {
  //   // If the message is from the server, then send to everyone.
  // });
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' }
  }, null /* no socket */, true /* send from server */);
});
