var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

var WHEAT = 3;

function WheatTile(number) {
  SettlersTile.call(this, number);
}

inherits(WheatTile, SettlersTile);

WheatTile.prototype.addResource = function(player) {
  player.addResource(1, WHEAT);
};

module.exports = WheatTile;