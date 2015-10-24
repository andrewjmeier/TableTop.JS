var Tile = require("./tile");
var inherits = require('util').inherits;

function OreTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(OreTile, Tile)

module.exports = OreTile;