function Space(name) {
  this.name = name;
  this.occupier = null;
}
// every space needs a landing action
Space.prototype.performLandingAction = function(game){
  console.log(game.getCurrentPlayer().name + " landed on " + this.name);
};

Space.prototype.canBuy = function(game){
	return false;
}

Space.prototype.oweRent = function(game){
	return false;
}

Space.prototype.own = function(game){
	return false;
}

module.exports = Space;
