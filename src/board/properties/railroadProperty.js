var Property = require('./property'),
    inherits = require('util').inherits;

var PG_RR = 8;

// rent should be array with following format:
// [1 owned (rent), 2 owned, 3 owned, 4 owned]
function RailroadProperty(name) {
  this.rent = [25, 50, 100, 200];
  var propertyGroup = PG_RR;
  var cost = 200;
  Property.call(this, name, cost, propertyGroup);
}

inherits(RailroadProperty, Property);

RailroadProperty.prototype.performLandingAction = function(game) {

  RailroadProperty.super_.prototype.performLandingAction.call(this, game);


  // todo
  // probably call something like:
  // handlePropertyLanding(name, cost, rent, player, multiplier);
};

RailroadProperty.prototype.getRent = function(game) {

  if (this.owner === null) { return 0 };

  var rrCount = 0;
  for (i in this.owner.properties) {
    if (this.owner.properties[i].propertyGroup === this.propertyGroup) {
      rrCount++;
    }
  }

  return this.rent[rrCount - 1];
};

module.exports = RailroadProperty;
