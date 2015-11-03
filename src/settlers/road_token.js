var inherits = require('util').inherits;
var Token = require("../token.js");

function RoadToken(player) {
  Token.call(this, player);
};

inherits(RoadToken, Token);

module.exports = RoadToken;