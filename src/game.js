function Game(players, board, turnMap) {
  this.players = players,
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = turnMap;
};

// <<<<<<< HEAD
// Game.prototype.updateState = function(btnPressed) {
//   this.stateMachine.buttonPressed(btnPressed, this);
// }
// =======
Game.prototype.updateState = function(click) {
  this.turnMap.processEvent(click, this);
};
//>>>>>>> 36516ef81d4380cca9d78026fc5bb0d194a99090

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

Game.prototype.getCurrentPlayer = function() {
  return this.players[this.currentPlayer];
};

module.exports = Game;
