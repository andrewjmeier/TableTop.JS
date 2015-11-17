var inherits = require('util').inherits;
var GridBoard = require("../../tabletop/core/gridBoard.js");
var Space = require("../../tabletop/core/tile.js");
var Token = require("../../tabletop/core/token.js");
var c = require("../../tabletop/core/ttConstants.js");

function CheckerBoard() { 
  GridBoard.call(this, 8, 8);
  this.buildTiles();
  this.buildTokens();
}

inherits(CheckerBoard, GridBoard);


CheckerBoard.prototype.buildTiles = function() { 
  var tileColor = c.redColor;
  var tile;
  for (var y = 0; y < this.height; y++) {
    tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
    for (var x = 0; x < this.width; x++) {
      tile = new Space({color: tileColor});
      this.spaces[x][y] = tile;
      tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
    }
  } 
};

CheckerBoard.prototype.buildTokens = function() { 

   // define coordinates for red and white tokens
  var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
  var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
  var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
  var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

  // build the tokens
  var space;
  for (var i = 0; i < redX.length; i++) { 

    space = this.getSpace(redX[i], redY[i]);
    this.buildTokenForSpace(space, c.redColor);

    space = this.getSpace(whiteX[i], whiteY[i]);
    this.buildTokenForSpace(space, c.whiteColor);

  }

};

/*
   creates the token for given space and color, 
   adds it to the space, and appends it to our 
   list of tokens 
*/
CheckerBoard.prototype.buildTokenForSpace = function(space, color) { 
  var token = new Token(null, space, color);
  space.addOccupier(token);
  this.tokens.push(token);
};

module.exports = CheckerBoard;
