Component = require("./component.js");
    inherits = require('util').inherits;

// more of a placeholder for now -
// should talk when merged to properly integrate this with
// existing "board" and "players" implementations if any exist
function Board() {
  this.spaces = [];
  this.tokens = [];
}

Board.prototype.getSpace = function(idx) { 
  return this.spaces[idx];
};

// TODO, maybe pass the token or the token class to this method?
Board.prototype.buildTokenForSpace = function(token, tile) { 
  tile.addOccupier(token);
  this.tokens.push(token);
};

module.exports = Board;
