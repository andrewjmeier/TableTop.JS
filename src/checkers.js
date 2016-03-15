// Checkers.js
    // Start creating your game here

    var TableTop = require('../tabletop/tabletop.js');
    var Checkers = require('./checkers/checkers_game');
    var CheckerBoard = require('./checkers/checkers_board');

    // create the Board, Game
    var board = new CheckerBoard();
    var checkers = new Checkers(board);

    //create our view
    var view = new TableTop.GridView(checkers);

    //create the turnmap
    var turnMap = new TableTop.ManualTurn(checkers);

    checkers.setTurnMap(turnMap);

    socket.on('move made', function(msg) {
        checkers.createFromJSONString(msg);
      });

      socket.on('game created', function(msg) {
        checkers.gameCreated(msg);
      });

      socket.on('message received', function(msg) {
        checkers.messageReceived(msg);
      });

      socket.on('game initiated', function(msg) {
        checkers.initiated();
      });

      PlayerFactory = function(type) {
        switch(type) {

          default:
            return new TableTop.Player();
        }
      }

      TokenFactory = function(type){
        switch(type) {
          case "Token":
            return new TableTop.Token();
          default:
            return new TableTop.Token();
        }
      }