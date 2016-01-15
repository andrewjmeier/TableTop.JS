var c = require("./ttConstants");
var ManualTurn = require("./manual_turn.js");
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
  this.board = board;
  this.dice = [];
  this.randomizeCurrentPlayer();
  this.turnMap = null;
  this.moveType = c.moveTypeDice; // manual movement or dicerolls
  this.proposedMove = {}; // for c.moveTypeManual
  this.moveEvaluationType = c.moveEvaluationTypeLandingAction;
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

Game.prototype.setTurnMap = function(turnMap) { 
  this.turnMap = turnMap;
};

/**
 * Set the move type for this game
 * @param {string} moveType - The move type. See ttConstants
*/
Game.prototype.setMoveType = function(moveType) { 
  this.moveType = moveType;
  if (moveType == c.moveTypeManual) { 
    this.proposedMove = {};
  } 
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
  for (var i = 0; i < numberOfDice; i++) {
    var roll = Math.floor(Math.random() * sides) + 1;
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

/**
 * Sets the last moved token for later reference
*/
Game.prototype.submitMove = function(token) { 
  this.lastMovedToken = token;
};

Game.prototype.nextPlayer = function() { 
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
};

Game.prototype.setProposedMoveDestination = function(space) { 
  this.proposedMove.destination = space;
};

Game.prototype.setProposedMoveToken = function(token) { 
  this.proposedMove.token = token;
};

Game.prototype.hasValidMove = function() { 
  
  if (this.moveType == c.moveTypeManual &&  (!this.proposedMove.token || !this.proposedMove.destination)) {
    return false;
  }
  else if (this.moveType == c.moveTypePlaceToken && !this.proposedMove.destination) {
    return false;
  } 

  var token = this.proposedMove.token;
  var tile = token ? token.space : null;
  var destination = this.proposedMove.destination;

  return this.isValidMove(token, 
                          tile, 
                          destination);
}; 

Game.prototype.isValidMove = function(token, oldSpace, newSpace) { 
  console.warn("isValidMove should be implemented by the subclass");
  return true;
};

Game.prototype.playerDidWin = function(player) {
  console.warn("playerDidWin should be implemented by the subclass");
  return false;
};

Game.prototype.executeMove = function(player) {
  throw new Error('executeMove must be implemented by the subclass!');
}

Game.prototype.moveTokenToSpace = function(token, destinationTile) { 
  token.space.removeOccupier(token);
  token.setSpace(destinationTile);
  destinationTile.addOccupier(token);
};

Game.prototype.tokenClicked = function(token) { 
  if (this.moveType == c.moveTypeManual &&
      this.turnMap.getCurrentState() == "waitingForMove") { 
    this.setProposedMoveToken(token);
  }
};


Game.prototype.spaceClicked = function(space) { 
  /* make sure we're in the right state, 
   a token has been pressed, 
   and we're not a tile with a token on it (if we have > 0
   children, then this click was meant for a token... */
  if (this.moveType == c.moveTypeManual && 
      this.turnMap.getCurrentState() == "waitingForMove" && 
      this.proposedMove.token && 
      this.proposedMove.token.space != space) { 

    this.setProposedMoveDestination(space);
    this.turnMap.updateState("makeMove");

  } else if (this.moveType == c.moveTypePlaceToken &&
      this.turnMap.getCurrentState() == "waitingForMove") {

    this.setProposedMoveDestination(space);
    this.turnMap.updateState("makeMove");
  }
};


module.exports = Game;