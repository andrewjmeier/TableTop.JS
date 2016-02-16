var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var games = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {

  var clientID = socket.id;

  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('move made', function(msg) {
    console.log(msg);
    console.log(clientID, "client ID");
    io.sockets.emit('move made', msg);
  });

  socket.on('create game', function(msg) {
    console.log("creating game");
    // create a uuid for the game, create a new list of clients, send back the uuid
    var uuid = guid();
    games[uuid] = [];
    games[uuid].push(clientID);
    socket.emit('game created', uuid);
  });

  socket.on('join game', function(msg) {
    // add client id to list of clients for game id
    games[msg].push(clientID);
  });

});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

http.listen(3000, function() {
  console.log("listening on port 3000");
});