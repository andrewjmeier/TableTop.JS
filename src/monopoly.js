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
var Player = require("./settlers/settlers_player");
var Settlement = require("./settlers/settlement_token");
var Road = require("./settlers/road_token");

var board = new Board();

var andrew = new Player("Andrew", 0);

andrew.cards = {
  0: 5,
  1: 2,
  2: 3,
  3: 1,
  4: 2
};

var garrett = new Player("Garrett", 1);
var jimmy = new Player("Shane", 2);

var settlement1 = new Settlement(andrew);
var settlement2 = new Settlement(andrew);
var road1 = new Road(andrew);
var road2 = new Road(andrew);

var road3 = new Road(garrett);
var road4 = new Road(jimmy);

board.addSettlement(settlement1, "5");
board.addSettlement(settlement2, "10");

board.addRoad(road1, "5", "13");
board.addRoad(road2, "2", "3");

board.addRoad(road3, "13", "14");
board.addRoad(road4, "25", "26");


var settlement3 = new Settlement(garrett);
var settlement4 = new Settlement(garrett);

board.addSettlement(settlement3, "7");
board.addSettlement(settlement4, "15");

var settlement5 = new Settlement(jimmy);
var settlement6 = new Settlement(jimmy);

board.addSettlement(settlement5, "25");
board.addSettlement(settlement6, "36");

var settlers = new Game([andrew, garrett, jimmy], board, {});

var view = new SettlersView(settlers);

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