var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;
var constants = require("./settlers_constants");

function WoodTile(number) {
  SettlersTile.call(this, number);
}

inherits(WoodTile, SettlersTile);

WoodTile.prototype.addResource = function(player) {
  player.addResource(1, constants.WOOD);
};

module.exports = WoodTile;