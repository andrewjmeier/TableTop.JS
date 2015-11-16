var Player = require("./player.js");
var Checkers = require("./checkers/checker_game.js");
var CheckerBoard = require("./checkers/checker_board.js");
var ManualTurn = require("./manualTurn.js");
var View = require("./view.js");


var redPlayer = new Player({name: "Red"});
var whitePlayer = new Player({name: "White"});
var players = [redPlayer, whitePlayer];

var board = new CheckerBoard();
var checkers = new Checkers(players, board);
var turnMap = new ManualTurn(checkers);
checkers.setTurnMap(turnMap);

var view = new View(checkers, turnMap);

view.drawBoard();
checkers.updateState("start");
