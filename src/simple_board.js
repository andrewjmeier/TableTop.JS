var inherits = require('util').inherits;
var Board = require("./board/board/board.js");
var Space = require("./board/board/space.js");

function SimpleBoard(numberOfSpaces) {
  Board.call(this);
  for (i = 0; i < numberOfSpaces; i++) {
    var space = new Space("Space Number " + i);
    this.spaces.push(space);
  }
}

inherits(SimpleBoard, Board);

module.exports = SimpleBoard;