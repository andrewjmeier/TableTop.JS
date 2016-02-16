var TableTop = require("../tabletop/tabletop");
var Player = require("./monopoly/monopoly_player.js");
var Card = require("../tabletop/core/card.js");
var Game = require("./monopoly/monopoly_game.js");
var Board = require("./monopoly/board_utils.js");
var Turn = require("./monopoly/monopoly_turn.js");
var MonopolyToken = require("./monopoly/monopoly_token.js");
var MonopolyView = require("./monopoly/view/monopoly_view.v2.js");

var john = new Player("Andrew", 1);

var steve = new Player("Quinn", 2);

var sam = new Player("James", 3);

var mike = new Player("Kevin", 4);

var jimmy = new Player("KC", 5);

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(board);

monopoly.setPlayers(players);

// monopoly.subscribe(function(message) {
//     var div = document.getElementById("messages");
//     div.innerHTML = div.innerHTML.concat("<br>" + message);
// });

var turn = new Turn(monopoly);

monopoly.setTurnMap(turn);

var view = new MonopolyView(monopoly);

socket.on('move made', function(msg) {
  console.log("a move was made and client received it");
  monopoly.createFromJSONString(msg);
});

socket.on('game created', function(msg) {
  console.log("game created", msg);
});

TokenFactory = function(type){
  switch(type) {
    case "Token":
      return new TableTop.Token();
    case "MonopolyToken":
      return new MonopolyToken();
    default:
      return new TableTop.Token();
  }
}