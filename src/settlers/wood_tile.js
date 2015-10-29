var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function WoodTile(number) {
  SettlersTile.call(this, number);
}

inherits(WoodTile, SettlersTile);

module.exports = WoodTile;