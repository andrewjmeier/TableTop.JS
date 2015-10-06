function Property(name, cost, propertyGroup) { 
  Space.call(this, name);
  this.cost = cost;
  this.mortage = .5*cost;
  this.propertyGroup = propertyGroup; // see PG_X constants 
  this.owner = null;
}
Property.prototype = Object.create(Space.prototype); // subclassing space
Property.prototype.performLandingAction = function(player) { 

  if (self.owner == player) return; 

  // todo  - finish hashing this out 

}; 

module.exports = Property;
