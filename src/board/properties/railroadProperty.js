require('../boardConstants');
var Property = require('./property'),     
    inherits = require('util').inherits;


// rent should be array with following format: 
// [1 owned (rent), 2 owned, 3 owned, 4 owned]
function RailroadProperty(name, cost, propertyGroup, rent) {
  this.rent = rent;
  Property.call(this, name, cost, propertyGroup);
}

inherits(RailroadProperty, Property);

RailroadProperty.prototype.performLandingAction = function(player) {
  // todo
  // probably call something like: 
  // handlePropertyLanding(name, cost, rent, player, multiplier);
}; 

module.exports = RailroadProperty;
