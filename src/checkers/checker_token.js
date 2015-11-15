var inherits = require('util').inherits;
var Token = require("../token");

function CheckerToken(owner, space, color, position) { 
  Token.call(this, owner, space, color, position);
} 

