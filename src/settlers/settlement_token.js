var inherits = require('util').inherits;
var Token = require("../token.js");


function SettlementToken(player, tiles) {
  Token.call(this, player);
  this.tiles = tiles;
};

inherits(SettlementToken, Token);

module.exports = SettlementToken;