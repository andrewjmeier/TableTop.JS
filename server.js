var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var games = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {

  var clientID = socket.id;

  console.log('a user connected', games);
  socket.on('disconnect', function() {
    for (var key in games) {
      if (games.hasOwnProperty(key)) {
        var game = games[key];
        for (var i = 0; i < game.length; i++) {
          if (game[i] == clientID) {
            game.splice(i, 1);
          }
        }
      }
    }
    console.log('user disconnected', games);
  });

  socket.on('move made', function(msg) {
    var dic = JSON.parse(msg);
    var game = games[dic.gameID];
    for (var i = 0; i < game.length; i++) {
      io.sockets.connected[game[i]].emit('move made', msg);
    }
  });

  socket.on('message sent', function(msg) {
    var dic = JSON.parse(msg);
    var game = games[dic.gameID];

    for (var i = 0; i < game.length; i++) {
      io.sockets.connected[game[i]].emit('message received', msg);
    }
  });

  socket.on('initiate game', function(msg) {
    var game = games[msg];

    for (var i = 0; i < game.length; i++) {
      io.sockets.connected[game[i]].emit('game initiated', msg);
    }
  });

  socket.on('create game', function(player) {
    var playerObj = JSON.parse(player);
    playerObj.id = 0;
    // create a uuid for the game, create a new list of clients, send back the uuid
    var uuid = getID();
    games[uuid] = [];
    games[uuid].push(clientID);
    var dic = JSON.stringify({
      gameID: uuid,
      player: playerObj
    });
    socket.emit('game created', dic);
  });

  socket.on('join game', function(msg) {
    // add client id to list of clients for game id
    var dic = JSON.parse(msg);
    console.log("joining game", msg);
    var game = games[dic.gameID];
    game.push(clientID);
    dic.player.id = game.length - 1;
    msg = JSON.stringify(dic);
    for (var i = 0; i < game.length; i++) {
      // for each connected player, send the gameID and player to them
      io.sockets.connected[game[i]].emit('game created', msg);
    }
  });

});

function getID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
      .toUpperCase();
  }
  return s4();
}

http.listen(3000, function() {
  console.log("listening on port 3000");
});