var Property = require('./property'),
    inherits = require('util').inherits;

var PG_UTIL = 9;

// rent is assumed here (4x, 10x)
function UtilityProperty(name) {
  var cost = 150;
  var propertyGroup = PG_UTIL
  Property.call(this, name, cost, propertyGroup);
}

inherits(UtilityProperty, Property);

UtilityProperty.prototype.performLandingAction = function(game) {

  UtilityProperty.super_.prototype.performLandingAction.call(this, game);

  // todo - need dice access here
};

UtilityProperty.prototype.getRent = function(game) {
  var utilityCount = 0;
  for (i in this.owner.properties) {
    if (this.owner.properties[i].propertyGroup === this.propertyGroup) {
      utilityCount++;
    }
  }

  var diceRoll = game.dice[0] + game.dice[1];
  return utilityCount === 2 ? diceRoll * 10 : diceRoll * 4;
};

module.exports = UtilityProperty;
