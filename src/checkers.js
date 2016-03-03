// Start creating your game here

// Our 5 Main Components
var TableTop = require('../tabletop/tabletop.js');
var Checkers = require('./checkers/checkers_game');
var CheckerBoard = require('./checkers/checkers_board');
var CheckerView = require('./checkers/checkers_view');

// create the Board, Game
var board = new CheckerBoard();
var checkers = new Checkers(board);

//create our view
var view = new TableTop.GridView(checkers);

//create the turnmap
var turnMap = new TableTop.ManualTurn(checkers);

checkers.setTurnMap(turnMap);

socket.on('move made', function(msg) {
  // console.log("move made msg rec");
  checkers.createFromJSONString(msg);
});

socket.on('game created', function(msg) {
  // console.log("game created msg rec");
  checkers.gameCreated(msg);
});

socket.on('message received', function(msg) {
  // console.log("msg rec msg rec");
  checkers.messageReceived(msg);
});

socket.on('game initiated', function(msg) {
  // console.log("initiated msg rec");
  checkers.initiated();
});



PlayerFactory = function(type) {
  // console.log("HERERE", type);

  switch(type) {
    case "AI":
      // console.log("HERERE");
      return new TableTop.AIPlayer();
    default:
      return new TableTop.Player();

  }
}

TokenFactory = function(type){
  switch(type) {
    case "Token":
      return new TableTop.Token();
    default:
      return new TableTop.Token();
  }
}

