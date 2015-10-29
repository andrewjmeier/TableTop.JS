var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

function WheatTile(number) {
  SettlersTile.call(this, number);
}

inherits(WheatTile, SettlersTile);

module.exports = WheatTile;