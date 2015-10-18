require ("../boardConstants");
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
  
    // todo  - finish hashing this out
  var actions = Property.super_.prototype.performLandingAction.call(this, game);
  
  var player = game.getCurrentPlayer();
  if (this.owner === player) { 
    actions[0] = actions[0].concat(" You own it!");
  } else if (player.owesRent(this)) { 
    var rent = this.getRent(game);
    player.payPlayer(rent, this.owner);
    actions[0] = actions[0].concat(" You payed $" + rent + " to " + this.owner.name + ". ");
  } else if (!this.owner) { 
    actions[0] = actions[0].concat(" It is unowned. ");
    actions[1] = BUY_PROMPT;
  } 

  return actions;
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

Property.prototype.isProperty = function() { 
  return true;
};


module.exports = Property;
