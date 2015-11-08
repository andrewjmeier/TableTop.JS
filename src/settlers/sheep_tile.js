var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;
var constants = require("./settlers_constants");

function SheepTile(number) {
  SettlersTile.call(this, number);
}

inherits(SheepTile, SettlersTile);

SheepTile.prototype.addResource = function(player) {
  player.addResource(1, constants.SHEEP);
};

module.exports = SheepTile;