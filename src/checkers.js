// Our 5 Main Components
// var Player = require("../tabletop/core/player.js");
var Checkers = require("./checkers/checker_game.js");
var CheckerBoard = require("./checkers/checker_board.js");
// var ManualTurn = require("../tabletop/core/manual_turn.js");
var CheckerView = require("./checkers/checker_view.js");
var TableTop = require('../tabletop/tabletop');

// create the players
var redPlayer = new TableTop.Player("Red", 1);
var whitePlayer = new TableTop.Player("White", 2);
var players = [redPlayer, whitePlayer];

// create the Board, Game, and TurnMap
var board = new CheckerBoard();
var checkers = new Checkers(players, board);
var turnMap = new TableTop.ManualTurn(checkers);
checkers.setTurnMap(turnMap);


// create our view, and draw it
var view = new CheckerView(checkers, turnMap);
view.drawBoard();

// this initiates the TurnMap ("Gameloop") and 
// gets the ball rolling!
checkers.updateState("start");
