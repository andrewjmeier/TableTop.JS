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

Property.prototype.performLandingAction = function(game) {
  var player = game.getCurrentPlayer();
  if (this.own(game)) return;

  if (this.oweRent(game)) {
    var rent = this.getRent(game);
    player.payPlayer(rent, this.owner);
  }
  // todo  - finish hashing this out
  Property.super_.prototype.performLandingAction.call(this, game);
};

Property.prototype.canBuy = function(game) {
  var player = game.getCurrentPlayer();
  if (this.owner === null) {
    if (player.money > this.cost) {
      return true;
    }
  } 
  return false;
};

Property.prototype.oweRent = function(game) {
  var player = game.getCurrentPlayer();
  if (this.owner !== null){
    if (this.owner !== player) {
        return true;
    }
  }
  return false;
};

Property.prototype.own = function(game) {
  var player = game.getCurrentPlayer();
  if (this.owner === player) return true;
  return false;
};



Property.prototype.buyProperty = function(player) {
  player.makePayment(this.cost);
  player.properties.push(this);
  this.owner = player;
};

Property.prototype.hasHotel = function(player) { 
  return false;
};

module.exports = Property;
