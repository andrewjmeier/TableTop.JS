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

Property.prototype.performLandingAction = function(player) { 
  
  if (self.owner == player) return; 
  // todo  - finish hashing this out 
}; 

module.exports = Property;
