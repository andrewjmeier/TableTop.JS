// require("./monopoly/board/boardConstants.js");

// var Player = require("./monopoly/monopoly_player.js");
// var Card = require("./monopoly/cards/card.js");
// var Game = require("./monopoly/monopoly_game.js");
// var Utils = require("./utils.js");
// var Board = require("./monopoly/board_utils.js");
// var Turn = require("./monopoly/monopoly_turn.js");
// var MonopolyView = require("./monopoly/view/monopoly_view.js");


// var john = new Player("Andrew", 1);

// var steve = new Player("Quinn", 2);

// var sam = new Player("James", 3);

// var mike = new Player("Kevin", 4);

// var jimmy = new Player("KC", 5);

// var players = [john, steve, sam, mike, jimmy];

// var board = new Board();

// var turn = new Turn();

// var monopoly = new Game(players, board, turn);

// var view = new MonopolyView(monopoly);

// view.drawBoard();

// //start running game
// turn.runStateMachine(false, monopoly);






var SettlersView = require("./settlers/view/settlers_view.js");
var Board = require("./settlers/settlers_board");
var Game = require("./settlers/settlers_game");
var Player = require("./player");
var Token = require("./settlers/settlement_token");

var board = new Board();

var Andrew = new Player("Andrew", 0);
var settlement1 = new Token(Andrew, [board.spaces[0], board.spaces[1], board.spaces[4]]);
Andrew.tokens.push(settlement1);

var Garrett = new Player("Garrett", 1);
var settlement2 = new Token(Garrett, [board.spaces[5], board.spaces[6], board.spaces[10]]);
Garrett.tokens.push(settlement2);

var game = new Game([Andrew, Garrett], board, {});

var view = new SettlersView(game);

view.drawBoard();










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