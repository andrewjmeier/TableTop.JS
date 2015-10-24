var Tile = require("./tile");
var inherits = require('util').inherits;

function BrickTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(BrickTile, Tile)

module.exports = BrickTile;