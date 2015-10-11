var Property = require('./property'),
    inherits = require('util').inherits;

// rent is assumed here (4x, 10x)
function UtilityProperty(name, cost, propertyGroup) {
  Property.call(this, name, cost, propertyGroup);
}

inherits(UtilityProperty, Property);

UtilityProperty.prototype.performLandingAction = function(player, dice) {

    UtilityProperty.super_.prototype.performLandingAction.call(this, player);

  // todo - need dice access here
};

module.exports = UtilityProperty;
