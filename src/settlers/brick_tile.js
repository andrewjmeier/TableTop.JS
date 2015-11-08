var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;
var constants = require("./settlers_constants");

function BrickTile(number) {
  SettlersTile.call(this, number);
}

inherits(BrickTile, SettlersTile)

BrickTile.prototype.addResource = function(player) {
  player.addResource(1, constants.BRICK);
};

module.exports = BrickTile;