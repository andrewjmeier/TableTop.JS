var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function OreTile(number) {
  SettlersTile.call(this, number)
}

inherits(OreTile, SettlersTile);

module.exports = OreTile;