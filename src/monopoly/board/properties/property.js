require ("../boardConstants");
var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;
var MonopolyPlayer = require("../../monopoly_player");

function Property(name, cost, propertyGroup) {
  MonopolyTile.call(this, name);
  this.cost = cost;
  this.mortgage = .5*cost;
  this.propertyGroup = propertyGroup; // see PG_X constants
  this.owned = false;
}

inherits(Property, MonopolyTile);

Property.prototype.performLandingAction = function(game) {
  
    // todo  - finish hashing this out
  var nextState = Property.super_.prototype.performLandingAction.call(this, game);
  
  var player = game.getCurrentPlayer();
  var message = "";
  var owner = game.getOwnerForProperty(this);
  if (owner && player.id == owner.id) { 
    message = player.name + " already owns it!";
  } else if (undefined != owner) { 
    var rent = this.getRent(game);
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
  propertyData.mortgage = this.mortgage;
  propertyData.propertyGroup = this.propertyGroup;
  propertyData.owned = this.owned;
  propertyData.type = "Property";

  return propertyData;
};

Property.prototype.createFromJSONString = function(data) {
  Property.super_.prototype.createFromJSONString.call(this, data);
  
  this.cost = data.cost;
  this.mortgage = data.mortgage;
  this.propertyGroup = data.propertyGroup;
  this.owned = data.owned;

};


module.exports = Property;
