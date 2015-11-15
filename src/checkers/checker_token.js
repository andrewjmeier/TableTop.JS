var inherits = require('util').inherits;
var Token = require("../token");

function CheckerToken(owner, color, position) { 
  Token.call(this, owner, color, position);
} 

