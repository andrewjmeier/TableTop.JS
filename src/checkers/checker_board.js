var inherits = require('util').inherits;
var GridBoard = require("../board/gridBoard.js");
var CheckerTile = require("./checker_tile.js");
var Token = require("../token.js");
var c = require("../ttConstants.js");

function CheckerBoard() { 
  GridBoard.call(this, 8, 8);
  this.buildTiles();
  this.tokens = []; 
  this.buildTokens();
}

inherits(CheckerBoard, GridBoard);


CheckerBoard.prototype.buildTiles = function() { 
  var tileColor = c.redColor;
  var tile;
  for (var y = 0; y < this.height; y++) {
    tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
    for (var x = 0; x < this.width; x++) {
      tile = new CheckerTile(tileColor);
      this.spaces[x][y] = tile;
      tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
    } 
  } 
};

CheckerBoard.prototype.buildTokens = function() { 

  var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
  var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
  var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
  var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

  var token;
  var space;
  for (var i = 0; i < redX.length; i++) { 

    space = this.getSpace(redX[i], redY[i]);
    token = new Token(null, space, c.redColor);

    space.addOccupier(token);
    token.setSpace(space);

    this.tokens.push(token);
  }

  for (var j = 0; j < redX.length; j++) { 

    space = this.getSpace(whiteX[j], whiteY[j]);
    token = new Token(null, space, c.whiteColor);

    space.addOccupier(token);
    token.setSpace(space);
    
    this.tokens.push(token);
  }

};

module.exports = CheckerBoard;