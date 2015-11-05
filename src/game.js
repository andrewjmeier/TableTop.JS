function Game(players, board, turnMap) {
  this.players = players,
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = turnMap;
};

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
  for (i = 0; i < numberOfDice; i++) {
    roll = Math.floor(Math.random() * sides) + 1;
    this.dice.push(roll);
  }
};

Game.prototype.isDoubles = function(dice) {
  return dice[0] === dice[1];
};

// Game.prototype.setState = function(newState) {
//   this.state = newState;
// };

Game.prototype.getCurrentPlayer = function() {
  return this.players[this.currentPlayer];
};

module.exports = Game;
