var inherits = require('util').inherits;
var Game = require("../game.js");


function SettlersGame(players, board, stateMachine) {
  Game.call(this, players, board, stateMachine);
  this.rollDice(2);
};

inherits(SettlersGame, Game);

module.exports = SettlersGame;