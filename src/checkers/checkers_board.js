var inherits = require('util').inherits;
var TableTop = require("../../tabletop/tabletop.js");

function CheckerBoard() { 
  TableTop.GridBoard.call(this, 8, 8);
  this.buildTiles();
  this.buildTokens();
}       

inherits(CheckerBoard, TableTop.GridBoard);


CheckerBoard.prototype.buildTiles = function() { 
  var tileColor = TableTop.Constants.redColor;
  var tile;
  for (var y = 0; y < this.height; y++) {
    tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
    for (var x = 0; x < this.width; x++) {
      tile = new TableTop.Tile({color: tileColor});
      this.tiles[x][y] = tile;
      tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
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
  var tile;
  for (var i = 0; i < redX.length; i++) { 

    tile = this.getTile(redX[i], redY[i]);
    this.buildTokenForTile(tile, TableTop.Constants.redColor);

    tile = this.getTile(whiteX[i], whiteY[i]);
    this.buildTokenForTile(tile, TableTop.Constants.whiteColor);
  }
};

// creates the token for given tile and color, 
// adds it to the tile, 
// and appends it to our list of tokens
CheckerBoard.prototype.buildTokenForTile = function(tile, color) { 
  var token = new TableTop.Token(null, tile, color);
  tile.addOccupier(token);
  this.tokens.push(token);
};


module.exports = CheckerBoard;
