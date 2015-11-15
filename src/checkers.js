var Player = require("player");
var Game = require("./checkers/checker_game.js");
var Utils = require("utils.js");
var CheckerBoard = require("./checkers/checker_board.js");
var Turn = require("turn.js");
var View = require("view.js");


var player1 = new Player("John", 1);
var player2 = new Player("Frank", 2);
var players = [player1, player2];

var board = new CheckerBoard();

var checkers = new Game(players, board, turnMachine);

var turnMachine = new Turn(checkers);

var view = new View(checkers, turnMachine);

view.drawBoard();

