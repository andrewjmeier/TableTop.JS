var Tile = require("./tile");
var inherits = require('util').inherits;

function SheepTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(SheepTile, Tile)

module.exports = SheepTile;