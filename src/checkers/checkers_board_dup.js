var inherits = require('util').inherits;
var TableTop = require("../../tabletop/tabletop.js");

function CheckerBoard() { 
  TableTop.ArrayBoard.call(this, 11, 11);
  this.buildTiles();
  this.buildTokens();
};

inherits(CheckerBoard, TableTop.ArrayBoard);

CheckerBoard.prototype.buildTiles = function() { 
  var tileColor = 0xF00000;
  var tile;
  for (var y = 0; y < 40; y++) {
    tile = new TableTop.Tile({color: tileColor});
    this.spaces[y] = tile;
    tileColor += 200;
  } 
};

CheckerBoard.prototype.buildTokens = function() {

  space = this.getSpace(10);
  this.buildTokenForSpace(space, TableTop.Constants.redColor);

  space = this.getSpace(22);
  this.buildTokenForSpace(space, TableTop.Constants.whiteColor);
};

// creates the token for given space and color, 
// adds it to the space, 
// and appends it to our list of tokens
CheckerBoard.prototype.buildTokenForSpace = function(space, color) { 
  var token = new TableTop.Token(null, space, color);
  space.addOccupier(token);
  this.tokens.push(token);
};


module.exports = CheckerBoard;