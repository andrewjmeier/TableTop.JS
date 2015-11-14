/**
 * The Game class
 * @constructor
 * @param {Player|Array} players - A list of players
 * @param {Board} board - The game board
*/
function Game(players, board, turnMap) {
  this.players = players,
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = turnMap;
};

/**
 * Method to call from the view to update the game state
 * @param {string} message - A string saying which state to transition to
*/
Game.prototype.updateState = function(message) {
  this.turnMap.updateState(message, this);
};

/**
 * Set the current player to a random player
 * Used to decide who goes first at the beginning of the game
*/
Game.prototype.randomizeCurrentPlayer = function() {
  this.currentPlayer = Math.floor(Math.random() * this.players.length);
};

/**
 * Roll the dice
 * Dice are represented as an array of ints stored in the state
 * @param {int} numberOfDice - The number of dice to roll
 * @param {int} sides - How many sides should be on the dice (defaults to 6)
*/
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

/**
 * Checks to see if the first two dice are the same value
 * @returns {Boolean}
*/
Game.prototype.isDoubles = function(dice) {
  return dice.length > 1 && dice[0] === dice[1];
};

/**
 * Returns the current player
 * @returns {Player}
*/
Game.prototype.getCurrentPlayer = function() {
  return this.players[this.currentPlayer];
};

module.exports = Game;
