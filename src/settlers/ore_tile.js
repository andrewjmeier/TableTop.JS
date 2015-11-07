var SettlersTile = require("./settlers_tile");
var inherits = require('util').inherits;

var ORE = 4;

function OreTile(number) {
  SettlersTile.call(this, number)
}

inherits(OreTile, SettlersTile);

OreTile.prototype.addResource = function(player) {
  player.addResource(1, ORE);
};

module.exports = OreTile;