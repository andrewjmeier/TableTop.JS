var Space = require("../board/space.js");
var inherits = require('util').inherits;

function CheckerTile(color) { 
  Space.call(this, null);
  this.color = color;
} 

inherits(CheckerTile, Space);

module.exports = CheckerTile;
