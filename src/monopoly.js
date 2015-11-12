require("./monopoly/board/boardConstants.js");

var Player = require("./monopoly/monopoly_player.js");
var Card = require("./monopoly/cards/card.js");
var Game = require("./monopoly/monopoly_game.js");
var Utils = require("./utils.js");
var Board = require("./monopoly/board_utils.js");
var Turn = require("./monopoly/monopoly_turn.js");
var MonopolyView = require("./monopoly/view/monopoly_view.js");


var john = new Player("Andrew", 1);

var steve = new Player("Quinn", 2);

var sam = new Player("James", 3);

var mike = new Player("Kevin", 4);

var jimmy = new Player("KC", 5);

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(players, board, turn);

// <<<<<<< HEAD
// var view = new MonopolyView(monopoly);

// view.drawBoard();

// //start running game
// turn.runStateMachine(BTN1, monopoly);


// =======
var turn = new Turn(monopoly);
// >>>>>>> 36516ef81d4380cca9d78026fc5bb0d194a99090

var view = new MonopolyView(monopoly, turn);

view.drawBoard();

