function Space(name) {
  this.name = name;
  this.occupier = null;
}
// every space needs a landing action
Space.prototype.performLandingAction = function(game){
  console.log(game.getCurrentPlayer().name + " landed on " + this.name);
};

module.exports = Space;
