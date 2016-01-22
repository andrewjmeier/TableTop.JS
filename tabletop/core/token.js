var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * A Token class
 * @constructor
 * @extends {Component}
 * @param {string} owner - The player who owns this token.
 * @param {Tile} tile - The tile where the token is being placed
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
*/
function Token(owner, tile, color) {
  Component.call(this);
  this.owner = owner;
  this.tile = tile;
  this.color = color;
  this.isDead = false;
};

inherits(Token, Component);

/**
 * Set the token's tile
 * @param {Tile} tile - the tile where the token sits
 * @returns {void}
*/
Token.prototype.setTile = function(tile) { 
  this.tile = tile;
};

/**
 * Remove the token from the board and player
 * @returns {void}
*/
Token.prototype.destroy = function() { 

  for (var i = 0; i < this.owner.tokens.length; i++) { 
    if (this.owner.tokens[i] == this) 
      this.owner.tokens.splice(i, 1);
  } 
  
  this.tile.removeOccupier(this);
  this.owner = null;
  this.tile = null;
  this.isDead = true;

};

/**
 * Move a token from one tile to another
 * @param {Tile} tile - tile to move to
 * @returns {void}
*/
Token.prototype.moveToTile = function(tile) {
  this.tile.removeOccupier(this);
  this.setTile(tile);
  tile.addOccupier(this);
};

module.exports = Token;
