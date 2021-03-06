var c = require("./ttConstants");
var ManualTurn = require("./manual_turn.js");
var Component = require("./component.js");
var inherits = require('util').inherits;
var _ = require('lodash');

/**
 * The Game class
 * @constructor
 * @extends {Component}
 * @param {Board} board - The game board
*/
function Game(board) {
  Component.call(this);
  this.board = board;
  this.dice = [];
  this.players = [];
  this.turnMap = null;
  this.moveType = c.moveTypeDice; // manual movement or dicerolls
  this.proposedMove = {}; // for c.moveTypeManual
  this.moveEvaluationType = c.moveEvaluationTypeLandingAction;
  this.possibleNumPlayers = [2, 3, 4, 5];
  this.showNextPlayerScreen = true;
  this.networking = true;
  this.playerColors = [0xFF0000, 0x000000, 0x00FF00, 0x0000FF, 0xFF00FF];
  this.currentPlayer = 0;
  this.gameID = null;
  this.clientPlayerID = -1;    // id of the player of THIS client
};

inherits(Game, Component);

Game.prototype.messageReceived = function(msg) {
  var message = JSON.parse(msg);

  // don't re-send message that we sent
  if (message.clientID === this.clientPlayerID) {
    return;
  }

  if (message.type === "state-machine" && message.text === this.turnMap.turnMap.compositeState()) {
    return;
  }


  if (message.type === "state-machine") {
    this.turnMap.transitionTo(message.text);
    return;
  }

  this.sendMessage(message.text, message.type, this, message.clientID);
};

Game.prototype.sendState = function(state) {
  // if it's waiting for roll, it's the next players turn so still send it
  if (this.clientPlayerID === this.currentPlayer || (state === "waitingOnRoll")) {
    this.sendData();
    this.sendMessage(state, "state-machine");
  }
};

Game.prototype.sendData = function() {
  if (!this.hasMadeGame) {
    this.hasMadeGame = true;
  }
  if(this.networking){
    var text = JSON.stringify(this.getJSONString());
    socket.emit('move made', text);
  }
};

Game.prototype.createGame = function(name) {
  var player = this.createPlayer(name).getJSONString();
  socket.emit('create game', JSON.stringify(player));
};


Game.prototype.startGame = function() {
  socket.emit('initiate game', this.gameID);
  this.sendData();
};

Game.prototype.initiated = function() {
  var context = this;

  this.subscribe(function(message) {
    // don't send a message to the server w/ client id b/c it was already sent
    if (message.clientID !== -1 || !(message.type === "standard" || message.type === "state-machine")) {
      return;
    }

    var msg = {
      text: message.text,
      type: message.type,
      gameID: context.gameID,
      clientID: context.clientPlayerID
    };

    socket.emit('message sent', JSON.stringify(msg));
  });
  this.sendMessage("", "hide start view");
  this.updateToStartState();
};

Game.prototype.joinGame = function(gameID, name) {
  var player = this.createPlayer(name).getJSONString();
  var data = {
    gameID: gameID,
    player: player
  };
  socket.emit('join game', JSON.stringify(data));
};

Game.prototype.gameCreated = function(msg) {
  dic = JSON.parse(msg);
  this.gameID = dic.gameID;
  var player = PlayerFactory();
  player.createFromJSONString(dic.player);
  this.players.push(player);  

  if (this.clientPlayerID === -1) {
    this.clientPlayerID = dic.player.id;
  } else {

  }
  
  this.sendMessage("refreshView", "view");
};

// OVERRIDE IN SUBCLASS! 
// FACTORY? 
Game.prototype.createPlayer = function(name) {

}

/**
 * Method to set turnMap of the game once it is created
 * This is required!
 * @param {Turn} turnMap - A turn object to be used by the game
*/
Game.prototype.setTurnMap = function(turnMap) {
  // context = this;
  this.turnMap = turnMap;
  // this.propagate(turnMap);
};

/**
 * Method to call from the view to update the game state
 * @param {string} message - A string saying which state to transition to
*/
Game.prototype.updateState = function(message) {
  this.turnMap.updateState(message, this);
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
 * Set the players for this game
 * @param {Player|Array} players - The players in the game
*/
Game.prototype.setPlayers = function(players) { 
  this.players = players;
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
 * Callback method from the view when a tile is clicked
 * To be overridden by the subclass
 * @abstract
 * @param {Tile} tile - the tile object that was clicked in the view
*/
Game.prototype.tileClicked = function(tile) {
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
  var player = this.getCurrentPlayer();
  var message = player.name + " rolled a ";
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
 * @param {Token} token - Last moved token
 * @returns {void}
*/
Game.prototype.submitMove = function(token) { 
  this.lastMovedToken = token;
};

/**
 * Switch to the next player
 * Override to provide more logic on determining the next player
 * @returns {void}
*/
Game.prototype.nextPlayer = function() { 
  this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
};

/**
 * Set the destination for a proposed move
 * @param {Tile} tile - the tile to move to
 * @returns {void}
*/
Game.prototype.setProposedMoveDestination = function(tile) { 
  this.proposedMove.destination = tile;
};

/**
 * Set the token for a proposed move
 * @param {Token} token - the token to move
 * @returns {void}
*/
Game.prototype.setProposedMoveToken = function(token) { 
  this.proposedMove.token = token;
};

/**
 * A proposed move exists and it is valid
 * @returns {boolean}
*/
Game.prototype.hasValidMove = function() { 
  // console.log("here", this.proposedMove);
  if (this.moveType == c.moveTypeManual &&  (!this.proposedMove.token || !this.proposedMove.destination)) {
    return false;
  }
  else if (this.moveType == c.moveTypePlaceToken && !this.proposedMove.destination) {
    return false;
  } 

  var token = this.proposedMove.token;
  var tile = null;
  if (token != null) {
    tile = this.board.findTileForToken(token);
  }
  var destination = this.proposedMove.destination;

  return this.isValidMove(token, 
                          tile, 
                          destination);
}; 

Game.prototype.getPlayerForToken = function(token) {
  for (var i = 0; i < this.players.length; i++) {
    var t = _.find(this.players[i].tokens, function(playerToken) {
      return playerToken === token;
    });
    if (t != null) {
      return this.players[i];
    }
  }
};

/**
 * Determines if it is valid to move the given token to the new tile
 * @param {Token} token - token to place or move
 * @param {Tile} oldTile - the previous token location (could be null if token not on board yet)
 * @param {Tile} newTile - the new token location
 * @abstract 
 * @returns {boolean}
*/
Game.prototype.isValidMove = function(token, oldTile, newTile) { 
  console.warn("isValidMove should be implemented by the subclass");
  return true;
};

/**
 * Evaluates the current state of the game and determines if a player won
 * @param {Player} player - the current player
 * @abstract
 * @returns {boolean}
*/
Game.prototype.playerDidWin = function(player) {
  console.warn("playerDidWin should be implemented by the subclass");
  return false;
};

/** 
 * Execute the proposed move made by the player
 * @param {Player} player - the current player
 * @abstract
 * @returns {void}
*/
Game.prototype.executeMove = function(player) {
  throw new Error('executeMove must be implemented by the subclass!');
};

/**
 * Event for when a token is clicked on
 * @param {Token} token - the token that was clicked
 * @returns {void}
*/
Game.prototype.tokenClicked = function(token) {
  if (this.currentPlayer !== this.clientPlayerID&& this.networking) {
    return;
  }
  if (this.moveType == c.moveTypeManual &&
      this.turnMap.getCurrentState() == "waitingForMove") { 
    this.setProposedMoveToken(token);
  }
};

/**
 * Event for when a tile is clicked on
 * @param {Tile} tile - the tile that was clicked
 * @returns {void}
*/
Game.prototype.tileClicked = function(tile) { 
  if (this.currentPlayer !== this.clientPlayerID&& this.networking) {
    return;
  }
  /* make sure we're in the right state, 
   a token has been pressed, 
   and we're not a tile with a token on it (if we have > 0
   children, then this click was meant for a token... */
  if (this.moveType == c.moveTypeManual && 
      this.turnMap.getCurrentState() == "waitingForMove" && 
      this.proposedMove.token && 
      this.proposedMove.token.tile != tile) { 

    this.setProposedMoveDestination(tile);
    this.turnMap.updateState("makeMove");

  } else if (this.moveType == c.moveTypePlaceToken &&
      this.turnMap.getCurrentState() == "waitingForMove") {

    this.setProposedMoveDestination(tile);
    this.turnMap.updateState("makeMove");
  }
};

Game.prototype.destroyToken = function(token) {
  _.forEach(this.players, function(player) {
    player.destroyToken(token);
  });
  this.board.destroyToken(token);
};

module.exports = Game;