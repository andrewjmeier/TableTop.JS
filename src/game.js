var c = require("./ttConstants");
var ManualTurn = require("./manualTurn.js");
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
  this.turnMap = turnMap;
  this.moveType = c.moveTypeDice; // manual movement or dicerolls
  this.proposedMove = {}; // for c.moveTypeManual
  this.moveEvaluationType = c.moveEvaluationTypeLandingAction;
  this.currentPlayer = 0;
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
  
  if (this.moveType != c.moveTypeManual) 
    return false;
  if (!this.proposedMove.token || !this.proposedMove.destination)
    return false;

  return this.isValidMove(this.proposedMove.token, 
                          this.proposedMove.token.space, 
                          this.proposedMove.destination);
}; 

Game.prototype.isValidMove = function(token, oldSpace, newSpace) { 
  console.log("Warning: you should overwrite isValidMove(token, oldSpaace, newSpace)");
  return true;
};

Game.prototype.playerDidWin = function(player) {
  console.log("Warning: you should overwrite playerDidWin(player)");
  return false;
};

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
  } 
};


module.exports = Game;
