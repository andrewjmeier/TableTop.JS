var inherits = require('util').inherits;
var Game = require("../game.js");
var Settlement = require("./settlement_token");

function SettlersGame(players, board, stateMachine) {
  Game.call(this, players, board, stateMachine);
  this.rollDice(2);
  this.lastPlacedSettlementVertex = null; // used for initial road building
  this.remainingInitialSettlements = players.length * 2;
};

inherits(SettlersGame, Game);

SettlersGame.prototype.createSettlement = function(vertex) {

  var player = this.getCurrentPlayer();

  switch (this.turnMap.getCurrentState()) {

    case "placingInitialSettlements":
      console.log("placingInitialSettlements");
      if (vertex.canBuild(player)) {
        var settlement = player.buildSettlement();
        vertex.addSettlement(settlement);
        this.lastPlacedSettlementVertex = vertex;
        console.log(settlement);
        this.remainingInitialSettlements--;
      }
      break;

    case "placingInitialRoad":
      console.log("placingInitialRoad");
      var road = player.buildRoad();
      var otherVertex = this.lastPlacedSettlementVertex;
      for (var i in vertex.edges) {
        var edge = vertex.edges[i];
        if (edge.startVertex === otherVertex || edge.endVertex === otherVertex) {
          edge.road = road;
          break;
        }
      }
      break;

    default:

      // check that the player has a remaining token/resources and
      // then check that the selected vertex is legal on the board
      if (player.canBuySettlement() && vertex.canBuild(player, true)) {
        var settlement = player.buySettlement();
        vertex.addSettlement(settlement);
        this.lastPlacedSettlementVertex = vertex;
      } else {
        console.log("don't have resources to build settlement");
      }
      break;
  }
};

SettlersGame.prototype.rollAndGiveCards = function() {
  this.rollDice(2);
  this.collectCards();
};

SettlersGame.prototype.collectCards = function() {
  for (var i in this.board.spaces) {
    var hex = this.board.spaces[i];
    if (hex.number === this.dice[0] + this.dice[1] && !hex.hasRobber) {
      for (var j in hex.verticies) {
        var vertex = hex.verticies[j];
        var settlement = vertex.settlement;
        if (settlement) {
          hex.addResource(settlement.player);
        }
      }
    }
  }
};

SettlersGame.prototype.nextPlayer = function() {
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
}

module.exports = SettlersGame;