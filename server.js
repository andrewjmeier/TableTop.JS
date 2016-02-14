var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('move made', function(msg) {
    console.log(msg);
    io.sockets.emit('move made', msg);
  });
});

http.listen(3000, function() {
  console.log("listening on port 3000");
});