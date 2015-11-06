var inherits = require('util').inherits;
var Token = require("../token.js");

function CityToken(player) {
  Token.call(this, player);
};

inherits(CityToken, Token);

module.exports = CityToken;