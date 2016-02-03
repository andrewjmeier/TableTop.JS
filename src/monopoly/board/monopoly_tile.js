require("./boardConstants");
var inherits = require('util').inherits;
var TableTop = require("../../../tabletop/tabletop.js");

function MonopolyTile(name) {
  TableTop.Tile.call(this, {name: name})
};

inherits(MonopolyTile, TableTop.Tile);

// every space needs a landing action
MonopolyTile.prototype.performLandingAction = function(game){
  return ["You landed on " + this.name + ". \n", POST_TURN];
};

MonopolyTile.prototype.isProperty = function() { 
  return false;
};

module.exports = MonopolyTile;