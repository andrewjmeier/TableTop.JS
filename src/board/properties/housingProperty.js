var Property = require('./property'),
    inherits = require('util').inherits;

// rent should be array with following format: 
// [rent, 1 house, 2 houses, 3 houses, 4 houses, hotel] 
function HousingProperty(name, cost, propertyGroup, rent) { 
  this.rent = rent;
  this.numHouses = 0;
  Property.call(this, name, cost, propertyGroup);
}

inherits(HousingProperty, Property);

HousingProperty.prototype.performLandingAction = function(player) { 
  // todo
  // see above railroad property fn comments
};

module.exports = HousingProperty;