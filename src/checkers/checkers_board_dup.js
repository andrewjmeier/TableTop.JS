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
    this.tiles[y] = tile;
    tileColor += 200;
  } 
};

CheckerBoard.prototype.buildTokens = function() {

  tile = this.getTile(10);
  this.buildTokenForTile(tile, TableTop.Constants.redColor);

  tile = this.getTile(22);
  this.buildTokenForTile(tile, TableTop.Constants.whiteColor);
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