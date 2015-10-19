require("./board/boardConstants.js");

var Player = require("./player.js");
var Card = require("./cards/card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");
var Turn = require("./turn.js");
var MonopolyView = require("./view/monopoly_view.js");

var john = new Player("John", 1);

var steve = new Player("Steve", 2);

var sam = new Player("Sam", 3);

var mike = new Player("Mike", 4);

var jimmy = new Player("Jimmy", 5);

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(players, board);

var turn = new Turn(monopoly);

var view = new MonopolyView(monopoly);
view.drawBoard();


// setup btns
var yesBtn = document.getElementById('btnYes');
yesBtn.onclick = function() {
  turn.runStateMachine(true, monopoly);
};

var noBtn = document.getElementById('btnNo');
noBtn.onclick = function() {
  turn.runStateMachine(false, monopoly);
};

var continueBtn = document.getElementById('btnContinue');
continueBtn.onclick = function() {
  turn.runStateMachine(false, monopoly);
};

//start running game
turn.runStateMachine(false, monopoly);

