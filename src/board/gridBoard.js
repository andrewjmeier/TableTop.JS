// gridBoard.j
var inherits = require('util').inherits;
var Board = require("../board/board.js");

function GridBoard(width, height) { 
  Board.call(this);
  for (var i = 0; i < height; i++) { 
    this.spaces[i] = [];
  }
  this.width = width;
  this.height = height;
};

inherits(GridBoard, Board);

GridBoard.prototype.getSpace = function(x, y) { 
  return this.spaces[x][y];
};

module.exports = GridBoard;
