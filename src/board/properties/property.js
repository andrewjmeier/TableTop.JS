var Space = require('../board/space'),
    inherits = require('util').inherits;

function Property(name, cost, propertyGroup) {
  Space.call(this, name);
  this.cost = cost;
  this.mortage = .5*cost;
  this.propertyGroup = propertyGroup; // see PG_X constants
  this.owner = null;
}

inherits(Property, Space);

Property.prototype.performLandingAction = function(game) {
  var player = game.getCurrentPlayer();
  if (this.owner === player) return;

  // give option to buy here? 
  if (player.owesRent(this)) { 
    player.payPlayer(this.getRent(game), this.owner);
  } 

  // todo  - finish hashing this out
  Property.super_.prototype.performLandingAction.call(this, game);
};


// overridden in subclasses
Property.prototype.getRent = function(player) {
  return 0;
};

// default to false here, overridden in subclasses
// where appropriate
Property.prototype.hasHotel = function(player) { 
  return false;
};

module.exports = Property;
