function Game(players, board, turnMap) {
  this.players = players;
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = turnMap;
}

Game.prototype.updateState = function(click) {
  this.turnMap.processEvent(click, this);
};

Game.prototype.randomizeCurrentPlayer = function() {
  this.currentPlayer = Math.floor(Math.random() * this.players.length);
};

Game.prototype.rollDice = function(numberOfDice, sides) {
  if (!sides) {
    sides = 6;
  }
  this.dice = [];
  for (var i = 0; i < numberOfDice; i++) {
    var roll = Math.floor(Math.random() * sides) + 1;
    this.dice.push(roll);
  }
};

Game.prototype.isDoubles = function(dice) {
  return dice[0] === dice[1];
};

Game.prototype.getCurrentPlayer = function() {
  return this.players[this.currentPlayer];
};

Game.prototype.nextPlayer = function() {
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
};

module.exports = Game;
