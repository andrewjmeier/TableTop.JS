var Space = require("../space.js");
var inherits = require('util').inherits;

function CheckerTile(color) { 
  Space.call(this, null);
  this.color = color;
} 

inherits(CheckerTile, Space);
