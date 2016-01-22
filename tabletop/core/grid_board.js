var inherits = require('util').inherits;
var Board = require("./board.js");

/**
 * Grid Board (i.e. Checkers)
 * @constructor
 * @extends {Board}
 * @param {int} width - width of the board
 * @param {int} height - height of the board
*/
function GridBoard(width, height) { 
  Board.call(this);
  for (var i = 0; i < width; i++) { 
    this.tiles[i] = Array(this.height);
  }

  this.width = width;
  this.height = height;
};

inherits(GridBoard, Board);

/**
 * Get a Tile from the board
 * @param {int} x - x coordinate of the tile
 * @param {int} y - y coordinate of the tile
 * @returns {Tile}
*/
GridBoard.prototype.getTile = function(x, y) { 
  return this.tiles[x][y];
};

/**
 * Get the position of a Tile 
 * @param {Tile} tile - The tile to find position of
 * @returns {Dictionary|int} {x: a, y: b}
*/
GridBoard.prototype.getTilePosition = function(tile) { 

  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) { 
      if (this.tiles[x][y] == tile) { 
        return {x: x, y: y};
      } 
    } 
  }
  
  return null;
};

module.exports = GridBoard;
