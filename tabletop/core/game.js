var c = require("./ttConstants");
var ManualTurn = require("./manual_turn.js");
var Component = require("./component.js");
var inherits = require('util').inherits;
var _ = require('lodash');
var $ = require('jquery');
var Tile = require('./tile.js');
var Token = require('./token.js');
var Player = require('./player.js');
var Gridboard = require('./grid_board.js');

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
  this.playerColors = [0xFF0000, 0x000000, 0x00FF00, 0x0000FF, 0xFF00FF];
  this.currentPlayer = 0;
  this.enableAI = false;
};

inherits(Game, Component);

/**
 * Method to set turnMap of the game once it is created
 * This is required!
 * @param {Turn} turnMap - A turn object to be used by the game
*/
Game.prototype.setTurnMap = function(turnMap) {
  context = this;
  this.turnMap = turnMap;
  this.propagate(turnMap);
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
 * Returns the next player, but does not switch
 * Override to provide more logic on determining the next player
 * @returns {void}
*/
Game.prototype.getNextPlayer = function() { 
  return (this.currentPlayer + 1) % this.players.length;
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


Game.prototype.pickAImove = function(player, game) { 

  var moves = this.getValidMoves(player);
  var results = [];

  // for each token, grab the appropriate objects from the game copy object
  // (since getValidMoves will return actual game objects and we want 
  // the copies). Then execute the move and score it.
  for (var i = 0; i < moves.tokens.length; i++) {

    var tokenIdx = this.board.tokens.indexOf(moves.tokens[i]);
    var tilePos = this.board.getTilePosition(moves.tiles[i]);
    
    moves.destinationTiles[i].forEach(function(dest) { 
      var destPos = this.board.getTilePosition(dest);

      var gameCopy = this.copyGameStatus(this);

      var tokenCp = gameCopy.board.tokens[tokenIdx];
      var tileCp, destCp;
      if (game.board instanceof Gridboard) { 
        tileCp = gameCopy.board.tiles[tilePos.x][tilePos.y];
        destCp = gameCopy.board.tiles[destPos.x][destPos.y];
      } else { 
        tileCp = gameCopy.board.tiles[tilePos];
        destCp = gameCopy.board.tiles[destPos];
      } 
        
      gameCopy.proposedMove = {
        token: tokenCp,
        tile: tileCp,
        destination: destCp,
        tokenIdx: tokenIdx, 
        tilePos: tilePos, 
        destPos: destPos
      };
      
      gameCopy.executeMove();
      results.push({
        score: gameCopy.scoreBoard(player), 
        token: tokenCp, 
        tile: tileCp, 
        destination: destCp,
        tokenIdx: tokenIdx, 
        tilePos: tilePos, 
        destPos: destPos
      });
    }, this);
  }
  
  var bestResult = results[0];
  var bestScore = 0;
  
  results.forEach(function(result) { 
    if (result.score > bestScore) { 
      bestResult = result; 
      bestScore = result.score;
    }
  });

  
  var actualToken = this.board.tokens[bestResult.tokenIdx];
  // actualTile should be same as this.board.tile[tilePos], but we 
  // use this cause it generalizes to all board types 
  var actualTile = this.board.findTileForToken(actualToken);

  var actualDest;
  if (this.board instanceof Gridboard) { 
    actualDest = this.board.getTile(bestResult.destPos.x, bestResult.destPos.y);
  } else { 
    actualDest = this.board.getTile(bestResult.destPos);
  } 
  
  var actualBestMove = 
        { 
          token: actualToken,
          tile: actualTile,
          destination: actualDest
        };
  
  return actualBestMove;
};

Game.prototype.getValidMoves = function(player) { 

  var legalMoves = {};
  legalMoves.tokens = [];
  legalMoves.tiles = [];
  legalMoves.destinationTiles = [];
  if (this.moveType == c.moveTypeManual) { 
    
    player.tokens.forEach(function(token) { 
      var tile = this.board.findTileForToken(token);
      var destinationTiles = [];
      // since this.board is a double array we need to double loop
      this.board.tiles.forEach(function(destinationRow) { 
        destinationRow.forEach(function(destination) { 
          if (this.isValidMove(token, tile, destination))
            destinationTiles.push(destination);
        }, this);
      }, this);
      
      if (destinationTiles.length > 0) { 
        legalMoves.tokens.push(token);
        legalMoves.tiles.push(tile);
        legalMoves.destinationTiles.push(destinationTiles);
      }
    }, this);
    
  } 
  
  return legalMoves;
};

// Create copy of game and manually copy over 
// tiles/tokens to remove references
Game.prototype.copyGameStatus = function(game) {

  //var newGame = $.extend(true, {}, game);
  var newGame = Object.create(this);
  newGame.board = Object.create(this.board);
  newGame.board.tokens = [];
  newGame.board.tiles = [];
  newGame.players = [];
  var i, j = 0;
  
  // copy players, clear token arrays
  for (i = 0; i < game.players.length; i++) { 
    newGame.players.push(new Player());
    Object.assign(newGame.players[i], game.players[i]);
    newGame.players[i].tokens = [];
  } 
  
  // copy tiles, clear token arrays
  if (game.board instanceof Gridboard) { 
    for (i = 0; i < game.board.tiles.length; i++) { 
      newGame.board.tiles.push([]);
      for (j = 0; j < game.board.tiles[i].length; j++)  {
        newGame.board.tiles[i].push(new Tile({}));
        Object.assign(newGame.board.tiles[i][j], game.board.tiles[i][j]);
        newGame.board.tiles[i][j].clearTokens();
      }
    } 
  } else { 
    for (i = 0; i < game.board.tiles.length; i++) { 
      newGame.board.tiles.push(new Tile({}));
      Object.assign(newGame.board.tiles[i], game.board.tiles[i]);
      newGame.board.tiles[i].clearTokens();
    } 
  } 
  
  // copy tokens, and assign to proper tile and player
  for (i = 0; i < game.board.tokens.length; i++) { 
    var token = game.board.tokens[i];
    newGame.board.tokens.push(new Token());
    var newToken = newGame.board.tokens[i];
    Object.assign(newToken, token);
    
    // assign tile to proper player if it's owned, or do nothing
    for (j = 0; j < game.players.length; j++) { 
      if (game.players[j].tokens.indexOf(token) >= 0) { 
        newGame.players[j].tokens.push(newToken);
      }
    } 

    // if a token is on a tile, add it to the tile's list of tokens
    var tile = game.board.findTileForToken(token);
    var tilePos = game.board.getTilePosition(tile);
    if (!tile || !tilePos) continue;
    
    if (game.board instanceof Gridboard)
      newGame.board.tiles[tilePos.x][tilePos.y].addToken(newGame.board.tokens[i]);
    else  
      newGame.board.tiles[tilePos].addToken(newGame.board.tokens[i]);
    
  }
  
  return newGame;
};


module.exports = Game;
