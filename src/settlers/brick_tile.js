var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

var BRICK = 1;

function BrickTile(number) {
  SettlersTile.call(this, number);
}

inherits(BrickTile, SettlersTile)

BrickTile.prototype.addResource = function(player) {
  player.addResource(1, BRICK);
};

module.exports = BrickTile;