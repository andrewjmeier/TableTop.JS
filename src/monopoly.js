require("./board/boardConstants.js");

var Player = require("./player.js");
var Card = require("./cards/card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");
var Turn = require("./turn.js");

var john = new Player("John");

var steve = new Player("Steve");

var sam = new Player("Sam");

var mike = new Player("Mike");

var jimmy = new Player("Jimmy");

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(players, board);

var turn = new Turn(monopoly);


//setup btns
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


