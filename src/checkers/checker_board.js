var inherits = require('util').inherits;
var GridBoard = require("../board/gridBoard.js");
var CheckersTile = require("checker_tile.js");
var Token = require("../token.js");
var c = require("ttConstants.js");

function CheckerBoard() { 
  GridBoard.call(this, 8, 8);
  this.buildTiles();
  this.tokens = []; 
  this.buildTokens();
}

inherits(CheckerBoard, GridBoard);


CheckerBoard.prototype.buildTiles = function() { 
  var tileColor = c.colorBlack;
  var tile;
  for (var y = 0; y < this.height; y++) {    
    tileColor = (tileColor == c.colorRed) ? c.colorBlack : c.colorRed;
    for (var x = 0; x < this.width; x++) {
      tile = CheckersTile(tileColor);
      this.space[x][y] = tile;
      tileColor = (tileColor == c.colorRed) ? c.colorBlack : c.colorRed;
    } 
  } 
};

CheckerBoard.prototype.buildTokens = function() { 
  var token;
  
  var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
  var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
  var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
  var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];


  for (var i = 0; i < redX.length; i++) { 
    token = Token(null, c.redColor, {x: redX[i], y: redY[i]});
    this.getSpace(redX[i], redY[i]).occupier = token;
    this.tokens.push(token);
  }

  for (var j = 0; j < redX.length; j++) { 
    token = Token(null, c.whiteColor, {x: whiteX[j], y: whiteY[j]});
    this.getSpace(redX[i], redY[i]).occupier = token;
    this.tokens.push(token);
  }

};

module.exports = CheckerBoard;
