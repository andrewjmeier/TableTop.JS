var Property = require('./property'),
    inherits = require('util').inherits;

var PG_BROWN = 0;
var PG_LIGHT_BLUE = 1;
var PG_PINK = 2;
var PG_ORANGE = 3;
var PG_RED = 4;
var PG_YELLOW = 5;
var PG_GREEN = 6;
var PG_BLUE = 7;

// rent should be array with following format:
// [rent, 1 house, 2 houses, 3 houses, 4 houses, hotel]
function HousingProperty(name, cost, propertyGroup, rent) {
  Property.call(this, name, cost, propertyGroup);
  this.rent = rent;
  this.numHouses = 0;
};

inherits(HousingProperty, Property);

HousingProperty.prototype.performLandingAction = function(game) {

    HousingProperty.super_.prototype.performLandingAction.call(this, game);
};

HousingProperty.prototype.getRent = function(game) {


  var rent = this.rent[this.numHouses];

  // if there are no houses but it's a monopoly return double rent
  if (this.numHouses === 0) {
    if (this.isMonopoly()) {
      return rent * 2;
    }
  }

  return rent;
};

HousingProperty.prototype.isMonopoly = function() {
  var groupCount = 0;
  for (i in this.owner.properties) {
    if (this.owner.properties[i].propertyGroup === this.propertyGroup) {
      groupCount++;
    }
  }

  return (this.propertyGroup === PG_BROWN || this.propertyGroup === PG__BLUE) ? groupCount === 2 : groupCount === 3;
};

HousingProperty.prototype.hasHotel = function() {
  return this.numHouses === 5;
};

module.exports = HousingProperty;
