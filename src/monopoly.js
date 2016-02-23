var TableTop = require("../tabletop/tabletop");
var Player = require("./monopoly/monopoly_player.js");
var Card = require("../tabletop/core/card.js");
var Game = require("./monopoly/monopoly_game.js");
var Board = require("./monopoly/board_utils.js");
var Turn = require("./monopoly/monopoly_turn.js");
var MonopolyToken = require("./monopoly/monopoly_token.js");
var MonopolyView = require("./monopoly/view/monopoly_view.v2.js");
var HousingProperty = require("./monopoly/board/properties/housingProperty.js");
var Property = require("./monopoly/board/properties/property.js");
var RailroadProperty = require("./monopoly/board/properties/railroadProperty.js");
var UtilityProperty = require("./monopoly/board/properties/utilityProperty.js");


// Wait for page to fully load (otherwise called twice)
window.onload = function () { 

  var board = new Board();

  var monopoly = new Game(board);

  var turn = new Turn(monopoly);

  monopoly.setTurnMap(turn);

  var view = new MonopolyView(monopoly);

  socket.on('move made', function(msg) {
    monopoly.createFromJSONString(msg);
  });

  socket.on('game created', function(msg) {
    monopoly.gameCreated(msg);
  });

  TokenFactory = function(type){
    switch(type) {
      case "Token":
        return new TableTop.Token();
      case "MonopolyToken":
        return new MonopolyToken();
      default:
        return new TableTop.Token();
    }
  }

  PlayerFactory = function(type) {
    switch(type) {

      default:
        return new Player();
    }
  }

  PropertyFactory = function(type) {
    switch(type) {
      case "HousingProperty":
        return new HousingProperty();
      case "RailroadProperty":
        return new RailroadProperty();
      case "UtilityProperty":
        return new UtilityProperty();
      default:
        return new Property();
    }
  }
}


