var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;
var constants = require("./settlers_constants");

function OreTile(number) {
  SettlersTile.call(this, number)
}

inherits(OreTile, SettlersTile);

OreTile.prototype.addResource = function(player) {
  player.addResource(1, constants.ORE);
};

module.exports = OreTile;