var inherits = require('util').inherits;
var Token = require("../token.js");


function SettlementToken(player) {
  Token.call(this, player);
};

inherits(SettlementToken, Token);

module.exports = SettlementToken;