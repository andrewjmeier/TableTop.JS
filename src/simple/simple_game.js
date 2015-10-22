var inherits = require('util').inherits;
var Game = require("../game.js");


function SimpleGame(players, board, stateMachine) {
  Game.call(this, players, board, stateMachine);
  this.state = WAITING_FOR_ROLL;
  this.message = "";
};

inherits(SimpleGame, Game);

SimpleGame.prototype.roll = function() {
  console.log("rolled");
  this.rollDice(1);
  return this.move();
};

SimpleGame.prototype.move = function() {
  var spacesToMove = 0;
  for (var index in this.dice) {
    spacesToMove += this.dice[index];
  }
  this.getCurrentPlayer().move(spacesToMove, this.board.spaces.length - 1);
  return "You rolled a " + spacesToMove + ". ";
};

SimpleGame.prototype.nextPlayer = function() {
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
};

module.exports = SimpleGame;
