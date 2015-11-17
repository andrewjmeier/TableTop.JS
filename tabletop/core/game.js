var Component = require("../../tabletop/core/component.js");
var inherits = require('util').inherits;

/**
 * The Game class
 * @constructor
 * @param {Player|Array} players - A list of players
 * @param {Board} board - The game board
*/
function Game(players, board) {
  Component.call(this);
  this.players = players,
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = null;
};

inherits(Game, Component);

/**
 * Method to set turnMap of the game once it is created
 * This is required!
 * @param {Turn} turnMap - A turn object to be used by the game
*/
Game.prototype.setTurn = function(turnMap) {
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
 * Callback method from the view when a token is clicked
 * To be overridden by the subclass
 * @abstract
 * @parram {Token} token - The token object that was clicked
*/
Game.prototype.tokenClicked = function(token) {
  throw new Error('must be implemented by subclass!');
};

/**
 * Callback method from the view when a space is clicked
 * To be overridden by the subclass
 * @abstract
 * @param {Space} space - the space object that was clicked in the view
*/
Game.prototype.spaceClicked = function(space) {
  throw new Error('must be implemented by subclass!');
};

/**
 * Check the Game State to see if a player has won the game
 * @abstract
 * @return {boolean}
*/
Game.prototype.isGameOver = function() {
  // TODO - check this method every transition in the state machine
  throw new Error('must be implemented by subclass!');
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
  var message = "You rolled a ";
  for (i = 0; i < numberOfDice; i++) {
    roll = Math.floor(Math.random() * sides) + 1;
    this.dice.push(roll);
    message = message.concat(roll + ", ");
  }

  this.sendMessage(message);
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