var Tile = require("./tile");
var inherits = require('util').inherits;

function WoodTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(WoodTile, Tile)

module.exports = WoodTile;