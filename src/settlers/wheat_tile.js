var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;
var constants = require("./settlers_constants");

function WheatTile(number) {
  SettlersTile.call(this, number);
}

inherits(WheatTile, SettlersTile);

WheatTile.prototype.addResource = function(player) {
  player.addResource(1, constants.WHEAT);
};

module.exports = WheatTile;