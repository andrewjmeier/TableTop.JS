var inherits = require('util').inherits;
var Player = require("../player.js");
var Settlement = require("./settlement_token");
var Road = require("./road_token");
var City = require("./city_token");


var WOOD = 0;
var BRICK = 1;
var SHEEP = 2;
var WHEAT = 3;
var ORE = 4;

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
  return this.cards[WOOD] > 0
      && this.cards[BRICK] > 0
      && this.cards[WHEAT] > 0
      && this.cards[SHEEP] > 0
      && this.settlementsRemaining > 0;
}

SettlersPlayer.prototype.buySettlement = function() {
  this.useResource(1, WOOD);
  this.useResource(1, BRICK);
  this.useResource(1, WHEAT);
  this.useResource(1, SHEEP);
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
  return this.cards[ORE] > 2
      && this.cards[WHEAT] > 1
      && this.citiesRemaining > 0;
}

SettlersPlayer.prototype.buyCity = function() {
  this.settlementsRemaining += 1;
  this.citiesRemaining -= 1;
  this.useResource(3, ORE);
  this.useResource(2, WHEAT);
};

SettlersPlayer.prototype.canBuyRoad = function() {
  return this.cards[WOOD] > 0
      && this.cards[BRICK] > 0
      && this.roadsRemaining > 0;
}

SettlersPlayer.prototype.buyRoad = function() {
  this.useResource(1, WOOD);
  this.useResource(1, BRICK);
  return this.buildRoad();
};

SettlersPlayer.prototype.canBuyDevelopmentCard = function() {
  return this.cards[SHEEP] > 0
      && this.cards[ORE] > 0
      && this.cards[WHEAT] > 0;
}

SettlersPlayer.prototype.buyDevelopmentCard = function() {
  // TODO add card to hand
  this.useResource(1, SHEEP);
  this.useResource(1, ORE);
  this.useResource(1, WHEAT);
};

module.exports = SettlersPlayer;
