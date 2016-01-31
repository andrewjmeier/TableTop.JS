// Start creating your game here

// Our 5 Main Components
var TableTop = require('../tabletop/tabletop.js');
var Checkers = require('./checkers/checkers_game');
var CheckerBoard = require('./checkers/checkers_board');
var CheckerView = require('./checkers/checkers_view');

// create the Board, Game
var board = new CheckerBoard();
var checkers = new Checkers(board);

//create our startView
var startView = new TableTop.StartView(checkers); 

// create our game view
var view = new CheckerView(checkers);

// create our next player view
var nextPlayerView = new TableTop.NextPlayerView(checkers);

// create our game over view
var gameOverView = new TableTop.GameOverView(checkers);

//create the turnmap
var turnMap = new TableTop.ManualTurn(checkers, startView, view, gameOverView, nextPlayerView);

checkers.setTurnMap(turnMap);

// this initiates the TurnMap ("Gameloop") and 
// gets the ball rolling!
checkers.updateState("start");
