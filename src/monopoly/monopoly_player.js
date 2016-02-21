var inherits = require('util').inherits;
// var Player = require("../../tabletop/core/player.js");
var TableTop = require('../../tabletop/tabletop');
var MonopolyToken = require('./monopoly_token');
var TokenTypes = require('./token_types');
var _ = require('lodash');

function MonopolyPlayer(name, number, id) {
  TableTop.Player.call(this, name, number, id);
  this.money = 1500;
  this.properties = [];
  this.tokens.push(this.createRandomUniqueToken());
  this.getOutOfJailFreeCards = 0;
  this.inJail = false;
  this.turnsInJail = 0;
};

inherits(MonopolyPlayer, TableTop.Player);

MonopolyPlayer.prototype.sendToJail = function() {
  this.position = 10;
  this.inJail = true;
};

MonopolyPlayer.prototype.payBail = function() {
  this.releaseFromJail();
  this.money -= 50;
};

MonopolyPlayer.prototype.getOutOfJailFree = function() {
  this.releaseFromJail();
  this.getOutOfJailFreeCards -= 1;
};

MonopolyPlayer.prototype.releaseFromJail = function() {
  this.inJail = false;
  this.turnsInJail = 0;
};

MonopolyPlayer.prototype.payPlayers = function(amount, players) {
  for (var index in players) {
    if (players[index] !== this) {
      this.payPlayer(amount, players[index]);
    }
  }
};

MonopolyPlayer.prototype.collectFromPlayers = function(amount, players) {
  for (var index in players) {
    if (players[index] !== this) {
      players[index].payPlayer(amount, this);
    }
  }
};

MonopolyPlayer.prototype.payPlayer = function(amount, player) {
  player.makeDeposit(amount);
  this.makePayment(amount);
};

MonopolyPlayer.prototype.makePayment = function(amount) {
  this.money -= amount;
};

MonopolyPlayer.prototype.makeDeposit = function(amount) {
  this.money += amount;
};

MonopolyPlayer.prototype.canBuy = function(property) {
  return (this.money > property.cost) && !property.owner;
};

MonopolyPlayer.prototype.owesRent = function(property) {
  return property.owner && !this.owns(property);
};

MonopolyPlayer.prototype.owns = function(property) {
  return property.owner === this;
};

MonopolyPlayer.prototype.buy = function(property) {
  this.makePayment(property.cost);
  this.properties.push(property);
  property.owner = this;
};

MonopolyPlayer.prototype.assets = function() {

  var assets = this.money;
  for (var prop_idx in this.properties) {
    var property = this.properties[prop_idx];
    assets += property.cost;
    if (property.numHouses)
      assets += property.numHouses*property.houseCost;
  }

  return assets;
};

MonopolyPlayer.prototype.createRandomUniqueToken = function() {
  var cssClass = _.sample(TokenTypes.playerTokens);

  _.remove(TokenTypes.playerTokens, function(n) {
    return n == cssClass;
  });

  token = new MonopolyToken(cssClass);

  return token;
};

//used in trading
MonopolyPlayer.prototype.removeProperty = function(property) {
  var index = this.properties.indexOf(property);
  //double check player has property then remove from player
  if(index > -1){
    this.properties.splice(index, 1);
  }

};

MonopolyPlayer.prototype.addItems = function(items) {
  for (var i in items.property) {
    this.properties.push(items.property[i]);
    items.property[i].owner = this;
  }
  this.money += items.money;
};

module.exports = MonopolyPlayer;
