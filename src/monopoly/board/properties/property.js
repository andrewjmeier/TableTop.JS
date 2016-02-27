require ("../boardConstants");
var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Property(name, cost, propertyGroup) {
  MonopolyTile.call(this, name);
  this.cost = cost;
  this.mortage = .5*cost;
  this.propertyGroup = propertyGroup; // see PG_X constants
  // this.owner = null;
}

inherits(Property, MonopolyTile);

Property.prototype.performLandingAction = function(game) {
  
    // todo  - finish hashing this out
  var nextState = Property.super_.prototype.performLandingAction.call(this, game);
  
  var player = game.getCurrentPlayer();
  var message = "";
  if (player.owns(this)) { 
    message = player.name + " already owns it!";
  } else if (player.owesRent(this)) { 
    var rent = this.getRent(game);
    var owner = game.getOwnerForProperty(this);
    player.payPlayer(rent, owner);
    message = player.name + " payed $" + rent + " to " + owner.name + ".";
  } else { 
    message = "It is unowned.";
    nextState = BUY_PROMPT;
  } 

  this.sendMessage(message);

  return nextState;
};


// overridden in subclasses
Property.prototype.getRent = function(game) {
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

Property.prototype.getJSONString = function() {
  var propertyData = Property.super_.prototype.getJSONString.call(this);

  propertyData.cost = this.cost;
  propertyData.mortage = this.mortage;
  propertyData.propertyGroup = this.propertyGroup;

  propertyData.type = "Property";

  return propertyData;
};

Property.prototype.createFromJSONString = function(data) {
  Property.super_.prototype.createFromJSONString.call(this, data);
  
  this.cost = data.cost;
  this.mortage = data.mortage;
  this.propertyGroup = data.propertyGroup;
};


module.exports = Property;
