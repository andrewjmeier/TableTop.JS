var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * The Board class
 * @constructor
 * @extends {Component}
*/
function Board() {
  Component.call(this);
  this.tiles = [];
  this.tokens = [];
}

inherits(Board, Component);

Board.prototype.getTile = function(idx) { 
  return this.tiles[idx];
};

// TODO, maybe pass the token or the token class to this method?
Board.prototype.buildTokenForTile = function(token, tile) { 
  tile.addToken(token);
  this.tokens.push(token);
};

Board.prototype.findTileForToken = function(token) {
  // override
}

Board.prototype.moveTokenToTile = function(token, tile) {
  // override in subclass!
};

module.exports = Board;
