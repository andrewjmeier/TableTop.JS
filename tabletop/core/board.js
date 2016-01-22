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
  tile.addOccupier(token);
  this.tokens.push(token);
};

module.exports = Board;
