require("../boardConstants");

function Space(name) {
  this.name = name;
  this.occupier = null;
}
// every space needs a landing action
Space.prototype.performLandingAction = function(game){
  return ["You landed on " + this.name + ". \n", POST_TURN];
};

Space.prototype.isProperty = function() { 
  return false;
};

module.exports = Space;
