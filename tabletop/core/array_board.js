var inherits = require('util').inherits;
var Board = require("./board.js");

/**
 * The ArrayBoard class
 * @constructor
 * @extends {Board}
 * @param {int} width - Number of tiles across the board
 * @param {int} height - Number of tiles down the board
*/
function ArrayBoard(width, height) { 
  Board.call(this);
  var numberOfSpaces = (width * 2) + (height * 2) - 2;
  
  this.tiles = Array(numberOfSpaces);

  this.width = width;
  this.height = height;
};

inherits(ArrayBoard, Board);

/**
 * Method to get the tile at the given index
 * @param {int} index - The index of the tile wanted
 * @returns {Tile}
*/
ArrayBoard.prototype.getTile = function(index) { 
  return this.tiles[index]
};

/**
 * Method to get the index of a Tile in the board
 * @param {Tile} tile - A board tile
 * @returns {int}
*/
ArrayBoard.prototype.getTilePosition = function(tile) { 

  for (var i = 0; i < this.tiles.length; i++) {
    if (this.tiles[i] == tile) { 
      return i;
    } 
  }
  
  return null;
};

module.exports = ArrayBoard;
