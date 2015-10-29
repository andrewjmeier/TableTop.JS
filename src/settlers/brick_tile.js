var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function BrickTile(number) {
  SettlersTile.call(this, number);
}

inherits(BrickTile, SettlersTile)

module.exports = BrickTile;