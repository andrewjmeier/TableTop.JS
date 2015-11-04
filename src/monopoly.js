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

var turn = new Turn();

var monopoly = new Game(players, board, turn);

var view = new MonopolyView(monopoly);

view.drawBoard();

//start running game
turn.runStateMachine(BTN1, monopoly);












// var Player = require("./simple/simple_player");
// var Game = require("./simple/simple_game");
// var Board = require("./simple/simple_board");
// var StateMachine = require("./simple/simple_turn");
// var View = require("./simple/view/simple_view");

// var player1 = new Player("Andrew");
// var player2 = new Player("Quinn");

// var board = new Board(20);
// var stateMachine = new StateMachine();

// var simpleGame = new Game([player1, player2], board, stateMachine);

// var view = new View(simpleGame);

// view.drawBoard();

// stateMachine.runStateMachine(false, simpleGame);