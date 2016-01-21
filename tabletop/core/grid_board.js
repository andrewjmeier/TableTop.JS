// grid_board.js

var inherits = require('util').inherits;
var Board = require("./board.js");

function GridBoard(width, height) { 
  Board.call(this);
  for (var i = 0; i < width; i++) { 
    this.tiles[i] = Array(this.height);
  }

  this.width = width;
  this.height = height;
};

inherits(GridBoard, Board);

GridBoard.prototype.getTile = function(x, y) { 
  return this.tiles[x][y];
};

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
