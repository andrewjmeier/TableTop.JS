require("./boardConstants");

var Tile = require("../../board/tile");
var inherits = require('util').inherits;


function Space(name) {
  this.name = name;
  this.occupier = null;
};

inherits(Space, Tile);


// every space needs a landing action
Space.prototype.performLandingAction = function(game){
  return ["You landed on " + this.name + ". \n", POST_TURN];
};

Space.prototype.isProperty = function() {
  return false;
};

module.exports = Space;
