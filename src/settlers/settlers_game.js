var inherits = require('util').inherits;
var Game = require("../game.js");
var Settlement = require("./settlement_token");

function SettlersGame(players, board, stateMachine) {
  Game.call(this, players, board, stateMachine);
  this.rollDice(2);
};

inherits(SettlersGame, Game);

SettlersGame.prototype.createSettlement = function(vertex) {
  var player = this.players[0];

  // check that the player has a remaining token/resources and
  // then check that the selected vertex is legal on the board
  if (player.canBuySettlement() && vertex.canBuild(player)) {
    var settlement = player.buySettlement();
  }
  vertex.addSettlement(settlement);
};

module.exports = SettlersGame;