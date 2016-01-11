// grid_board.js

var inherits = require('util').inherits;
var Board = require("./board.js");

function GridBoard(width, height) { 
  Board.call(this);
  for (var i = 0; i < width; i++) { 
    this.spaces[i] = Array(this.height);
  }

  console.log(this.spaces, this.spaces[0], this.spaces[0][0]);

  this.width = width;
  this.height = height;
};

inherits(GridBoard, Board);

GridBoard.prototype.getSpace = function(x, y) { 
  return this.spaces[x][y];
};

GridBoard.prototype.getSpacePosition = function(space) { 

  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) { 
      if (this.spaces[x][y] == space) { 
        return {x: x, y: y};
      } 
    } 
  }
  
  return null;
};

module.exports = GridBoard;
