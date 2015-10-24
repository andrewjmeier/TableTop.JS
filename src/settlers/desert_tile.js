var Tile = require("./tile");
var inherits = require('util').inherits;

function DesertTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(DesertTile, Tile)

module.exports = DesertTile;