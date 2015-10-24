var Tile = require("./tile");
var inherits = require('util').inherits;

function WheatTile(number) {
  Tile.call(this)
  this.number = number;
}

inherits(WheatTile, Tile)

module.exports = WheatTile;