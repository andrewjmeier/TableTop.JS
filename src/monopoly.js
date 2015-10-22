// require("./board/boardConstants.js");

// var Player = require("./monopoly_player.js");
// var Card = require("./cards/card.js");
// var Game = require("./monopoly_game.js");
// var Utils = require("./utils.js");
// var Board = require("./board_utils.js");
// var Turn = require("./monopoly_turn.js");
// var MonopolyView = require("./view/monopoly_view.js");


// var john = new Player("John", 1);

// var steve = new Player("Steve", 2);

// var sam = new Player("Sam", 3);

// var mike = new Player("Mike", 4);

// var jimmy = new Player("Jimmy", 5);

// var players = [john, steve, sam, mike, jimmy];

// var board = new Board();

// var turn = new Turn();

// var monopoly = new Game(players, board, turn);

// var view = new MonopolyView(monopoly);

// view.drawBoard();

// //start running game
// turn.runStateMachine(false, monopoly);

var Player = require("./simple_player");
var Game = require("./simple_game");
var Board = require("./simple_board");
var StateMachine = require("./simple_turn");

var player1 = new Player("Andrew");
var player2 = new Player("Quinn");

var board = new Board(20);
var stateMachine = new StateMachine();

var simpleGame = new Game([player1, player2], board, stateMachine);

stateMachine.runStateMachine(false, simpleGame);