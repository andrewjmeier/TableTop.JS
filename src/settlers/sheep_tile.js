var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

var SHEEP = 2;

function SheepTile(number) {
  SettlersTile.call(this, number);
}

inherits(SheepTile, SettlersTile);

SheepTile.prototype.addResource = function(player) {
  player.addResource(1, SHEEP);
};

module.exports = SheepTile;