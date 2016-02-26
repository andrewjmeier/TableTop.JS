# Adding Online Multiplayer to your games using TableTop.JS

At this point, you've built a game. It's super cool, all of your friends are playing it, but there's one problem. The only way you can play with all of your friends is if you huddle around a table and share a computer. Everyone really likes playing your game, but it's very difficult to get the whole gang in the same room together to play. But how do you make your game multiplayer across multiple computers (or even phones/tablets)? It certainly doesn't sound like an easy task. We realize how difficult it can be to add multiplayer so we've done all of the heavy lifting for you. With just a few lines of code, you can add multiplayer to your game!

## How does it work?

In most online applications there are two parts. The client is the code running locally on the users computer. Then there's also a server which is running seperately. There could be multiple versions of the client code running if you have multiple people playing the game, but there will only be one server. 

## Setting up the server

The server code is all written for you. All you need to do is copy it into a file in the root of your project. We'll still explain what the server code does, but you don't need to worry about changing any of it. 

The server is used to relay messages between the different clients. We're using Socket.io to communicate between the clients and the server. Each client has a client id that can be used to send a message to that specific client. When a client creates a new game, we create a game id for that game, and then create a list of client ids for that game. Then whenever someone joins the game, we add the new client id to the list of client ids for the given game id. Then whenever a move is made, the server relays the message to all of the other players of that specific game. 

```
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
    // io.sockets.emit('move made', msg);
    for (var i = 0; i < game.length; i++) {
      io.sockets.connected[game[i]].emit('move made', msg);
    }
  });

  socket.on('create game', function(player) {
    var playerObj = JSON.parse(player);
    playerObj.id = 0;
    console.log("creating game");
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
```

The first important part of the server code come directly after the different require statements. Here we're taking everything in the /public directory and setting the server to use that as the root. So if someone goes to www.mywebsite.com (or whatever website your game is at) they will only have access to the files that you place in /public. This simplifies your website and also adds a layer of security in case you have secure files in your project (such as login tokens) that you want hidden from your users. Then after that, we say that the root ("/") should return the file /public/index.html. Generally, index.html is used as the main html page of a website.  

```
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
```

Now we have a method from Socket.io that we need to set up. Socket.io works by sending messages between the clients and the server. Each message contains a key and the actual message. In this case, 'connection' is a default message that gets sent to the server whenever a new client connects. So we'll create an event method that gets called whenever we receive the 'connection' message. Inside this method, we'll set up a bunch of other events for the different messenges that our game can send. 

```
io.on('connection', function(socket) {
  ...
}
```

In the same way we listen for 'connection', we also want to listen for 'disconnect'. As you have probably guessed, the 'disconnect' event happens whenever a client disconnects from the server. This could be becasue they closed the webpage, refreshed the page, or they lost their internet connection. We use this method to remove players from the game when they disconnect. 

```
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
```

The main method that we have occurs on the 'move made' event. This event fires whenever a player makes a move and sends that move to the server. This method grabs the game id from the message and then finds all of the other players in the game and sends the message on to them.

```
socket.on('move made', function(msg) {
  var dic = JSON.parse(msg);
  var game = games[dic.gameID];
  // io.sockets.emit('move made', msg);
  for (var i = 0; i < game.length; i++) {
    io.sockets.connected[game[i]].emit('move made', msg);
  }
});
```

There are two different ways for a client to start playing a game. Either the user can create a new game or he can join an existing game. If the user chooses to create a new game, we start by creating an ID for the game. We have a simple utility method that generates a four digit id for the game. Then we add that game id to the server's dictionary of games with the client id. Finally, we need to return the game id back to the client so that the user can tell his friends the code to join his game. 

```
socket.on('create game', function(player) {
  var playerObj = JSON.parse(player);
  playerObj.id = 0;
  console.log("creating game");
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
```

The last method is for a client to join a game. First we get the game id from the client for the game that it wants to join. Then we add the client id to the game dictionary. Finally, we send the new player data back to all of the other players in the game. 

```
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
```

As you can see, there's nothing specific in this server code to any specific board game. Regardless of the game that you want to make, you should be able to simply paste this code into a file and your server will be finished. 

Take this code and paste it into a file named `server.js` in the root of your project. Then, in the terminal enter the command `node server.js` to start running the server using node.js. Now we need to set up the client to be able to interact with the server. 

## Setting up the public directory

We touched on this briefly during the server part. The server is going to take anything in the public directory and use that as the root. So going to www.mywebsite.com is really like going to www.mywebsite.com/public. This means that we need all of the public files to be in the public directory. First, take your `index.html` file that contains your game board and move that to the public directory. Now, we need to make a slight change to webpack so that `bundle.js` gets built in the public directory. Open `webpack.config.js` and change the output filename. Instead of simply `bundle.js` we want the output to be `/public/bundle.js`. Any additional css files should also be moved to the public directory. 

```
output: {
    path: __dirname,
    filename: "/public/bundle.js"
```

## Setting up the client

If your game is working nicely, you already have an `index.html` file contianing your game board. Locate the script tag that you already have in it to include the `bundle.js` file. Add the following additional lines to setup the client to work with socket.io. All this does is import the socket.io library and then create a new instance of socket.io for the client. 

```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
<script src="/bundle.js"></script>
```

At this point, you can test out your game. If you have the server running (with `node server.js` in the terminal) go to `localhost:3000` If everything worked, you should see "a user connected" print out in the terminal window. We're still a few steps away from a functioning game, but at least now we have the client and server talking to each other. 



