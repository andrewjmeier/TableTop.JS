var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function SheepTile(number) {
  SettlersTile.call(this, number);
}

inherits(SheepTile, SettlersTile);

module.exports = SheepTile;