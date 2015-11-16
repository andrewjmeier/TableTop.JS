// Import necessary modules
var Player = require("./player.js"); 
var Checkers = require("./checkers/checker_game.js");
var CheckerBoard = require("./checkers/checker_board.js");
var ManualTurn = require("./manualTurn.js");
var View = require("./view.js");

// create the players
var redPlayer = new Player({name: "Red"});
var whitePlayer = new Player({name: "White"});
var players = [redPlayer, whitePlayer];

// create the Board, Game, and TurnMap
var board = new CheckerBoard();
var checkers = new Checkers(players, board);
var turnMap = new ManualTurn(checkers);
checkers.setTurnMap(turnMap);


// create our view, and draw it
var view = new View(checkers, turnMap);
view.drawBoard();

// this initiates the TurnMap ("Gameloop") and 
// gets the ball rolling!
checkers.updateState("start");
