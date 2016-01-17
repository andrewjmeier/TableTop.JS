// Start creating your game here

// Our 5 Main Components
var TableTop = require('../tabletop/tabletop.js');
var Checkers = require('./checkers/checkers_game');
var CheckerBoard = require('./checkers/checkers_board');
var CheckerView = require('./checkers/checkers_view');

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
