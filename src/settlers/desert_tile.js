var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function DesertTile(number) {
  SettlersTile.call(this, number);
  this.hasRobber = true;
}

inherits(DesertTile, SettlersTile);

module.exports = DesertTile;