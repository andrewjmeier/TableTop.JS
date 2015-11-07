var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

var WOOD = 1;

function WoodTile(number) {
  SettlersTile.call(this, number);
}

inherits(WoodTile, SettlersTile);

WoodTile.prototype.addResource = function(player) {
  player.addResource(1, WOOD);
};

module.exports = WoodTile;