var inherits = require('util').inherits;
var Board = require("./board.js");

function ArrayBoard(width, height) { 
  Board.call(this);
  var numberOfSpaces = (width * 2) + (height * 2) - 2;
  
  this.spaces = Array(numberOfSpaces);

  this.width = width;
  this.height = height;
};

inherits(ArrayBoard, Board);

ArrayBoard.prototype.getSpace = function(index) { 
  return this.spaces[index]
};

ArrayBoard.prototype.getSpacePosition = function(space) { 

  for (var i = 0; i < this.spaces.length; i++) {
    if (this.spaces[i] == space) { 
      return i;
    } 
  }
  
  return null;
};

module.exports = ArrayBoard;
