var Player = require("./player.js");
var Game = require("./checkers/checker_game.js");
var CheckerBoard = require("./checkers/checker_board.js");
var ManualTurn = require("./manualTurn.js");
var View = require("./view.js");


var player1 = new Player("John", 1);
var player2 = new Player("Frank", 2);
var players = [player1, player2];

var board = new CheckerBoard();

var checkers = new Game(players, board);
var turnMap = new ManualTurn(checkers);
checkers.setTurnMap(turnMap);

var view = new View(checkers, turnMap);

view.drawBoard();
checkers.updateState("start");
