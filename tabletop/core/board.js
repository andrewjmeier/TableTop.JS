Component = require("./component.js");
    inherits = require('util').inherits;

/**
 * The Board class
 * @constructor
*/
function Board() {
  this.tiles = [];
  this.tokens = [];
}

Board.prototype.getTile = function(idx) { 
  return this.tiles[idx];
};

// TODO, maybe pass the token or the token class to this method?
Board.prototype.buildTokenForTile = function(token, tile) { 
  tile.addOccupier(token);
  this.tokens.push(token);
};

module.exports = Board;
