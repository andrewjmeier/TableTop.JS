// rent is assumed here (4x, 10x) 
function UtilityProperty(name, cost, propertyGroup) { 
  Property.call(this, name, cost, propertyGroup);
}
UtilityProperty.prototype = Object.create(Property.prototype);
UtilityProperty.prototype.performLandingAction = function(player, dice) { 
  // todo - need dice access here
}; 

module.exports = UtilityProperty;
