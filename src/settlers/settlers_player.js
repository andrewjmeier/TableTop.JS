var inherits = require('util').inherits;
var Player = require("../player.js");
var Settlement = require("./settlement_token");
var Road = require("./road_token");
var City = require("./city_token");
var constants = require("./settlers_constants");

function SettlersPlayer(name, number) {
  Player.call(this, name, number);
  this.cards = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
  this.developmentCards = [];
  this.settlementsRemaining = 5;
  this.citiesRemaining = 4;
  this.roadsRemaining = 15; // TODO check this number
  this.hasLongestRoad = false;
  this.hasLargestArmy = false;
};

inherits(SettlersPlayer, Player);

SettlersPlayer.prototype.getVictoryPoints = function() {
  var settlements = 5 - this.settlementsRemaining;
  var cities = 4 - this.citiesRemaining;
  var army = this.hasLargestArmy ? 2 : 0;
  var road = this.hasLongestRoad ? 2 : 0;
  // TODO search devo cards for victory points
  return settlements + (2 * cities) + army + road;
};

SettlersPlayer.prototype.addResource = function(amount, resource) {
  this.cards[resource] += amount;
};

SettlersPlayer.prototype.useResource = function(amount, resource) {
  this.cards[resource] -= amount;
};

SettlersPlayer.prototype.canBuySettlement = function() {
  return this.cards[constants.WOOD] > 0
      && this.cards[constants.BRICK] > 0
      && this.cards[constants.WHEAT] > 0
      && this.cards[constants.SHEEP] > 0
      && this.settlementsRemaining > 0;
}

SettlersPlayer.prototype.buySettlement = function() {
  this.useResource(1, constants.WOOD);
  this.useResource(1, constants.BRICK);
  this.useResource(1, constants.WHEAT);
  this.useResource(1, constants.SHEEP);
  return this.buildSettlement();
};

SettlersPlayer.prototype.buildSettlement = function() {
  this.settlementsRemaining -= 1;
  return new Settlement(this);
};

SettlersPlayer.prototype.buildRoad = function() {
  this.roadsRemaining -= 1;
  return new Road(this);
};

SettlersPlayer.prototype.canBuyCity = function() {
  return this.cards[constants.ORE] > 2
      && this.cards[constants.WHEAT] > 1
      && this.citiesRemaining > 0;
}

SettlersPlayer.prototype.buyCity = function() {
  this.settlementsRemaining += 1;
  this.citiesRemaining -= 1;
  this.useResource(3, constants.ORE);
  this.useResource(2, constants.WHEAT);
};

SettlersPlayer.prototype.canBuyRoad = function() {
  return this.cards[constants.WOOD] > 0
      && this.cards[constants.BRICK] > 0
      && this.roadsRemaining > 0;
}

SettlersPlayer.prototype.buyRoad = function() {
  this.useResource(1, constants.WOOD);
  this.useResource(1, constants.BRICK);
  return this.buildRoad();
};

SettlersPlayer.prototype.canBuyDevelopmentCard = function() {
  return this.cards[constants.SHEEP] > 0
      && this.cards[constants.ORE] > 0
      && this.cards[constants.WHEAT] > 0;
}

SettlersPlayer.prototype.buyDevelopmentCard = function() {
  // TODO add card to hand
  this.useResource(1, constants.SHEEP);
  this.useResource(1, constants.ORE);
  this.useResource(1, constants.WHEAT);
};

module.exports = SettlersPlayer;
