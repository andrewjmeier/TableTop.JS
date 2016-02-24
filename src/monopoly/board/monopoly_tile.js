require("./boardConstants");
var inherits = require('util').inherits;
var TableTop = require("../../../tabletop/tabletop.js");

function MonopolyTile(name) {
  TableTop.Tile.call(this, {name: name})
};

inherits(MonopolyTile, TableTop.Tile);

// every space needs a landing action
MonopolyTile.prototype.performLandingAction = function(game){
  var player = game.getCurrentPlayer();
  var message = player.name + " landed on " + this.name;
  this.sendMessage(message);
  return ["", POST_TURN];
};

MonopolyTile.prototype.isProperty = function() { 
  return false;
};

module.exports = MonopolyTile;