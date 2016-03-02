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
  var token = this.createRandomUniqueToken();
  this.tokens.push(token);
  this.getOutOfJailFreeCards = 0;
  this.inJail = false;
  this.turnsInJail = 0;
};

inherits(MonopolyPlayer, TableTop.Player);

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
  return (this.money > property.cost) && !property.owned;
};

// MonopolyPlayer.prototype.owesRent = function(property) {
//   return property.owner && !this.owns(property);
// };

// MonopolyPlayer.prototype.owns = function(property) {
//   return property.owner && property.owner.id === this.id;
// };

MonopolyPlayer.prototype.buy = function(property) {
  this.makePayment(property.cost);
  this.properties.push(property);
  property.owned = true;
  var message = this.name + " purchased " + property.name + " for $" + property.cost;
  this.sendMessage(message);
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

  this.sendMessage(token, "token-created");

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

MonopolyPlayer.prototype.getToken = function() {
  return this.tokens[0];
};

MonopolyPlayer.prototype.addItems = function(items) {
  this.money += items.money;

  if ((undefined == this.properties) || (this.properties.length < 1)) {
    this.properties = items.property;
    console.log("here", this.properties);
    return;
  }

  for (var i in items.property) {
    this.properties.push(items.property[i]);
    items.property[i].owned = true;
    console.log("there", this.properties);
  }
};

MonopolyPlayer.prototype.getJSONString = function() {

  var playerStuff = MonopolyPlayer.super_.prototype.getJSONString.call(this);

  playerStuff.money = this.money;
  playerStuff.getOutOfJailFreeCards = this.getOutOfJailFreeCards;
  playerStuff.inJail = this.inJail;
  playerStuff.turnsInJail = this.turnsInJail;

  var properties = [];
  for (var i = 0; i < this.properties.length; i++) {
    var property = this.properties[i].getJSONString();
    properties.push(property);
  }

  playerStuff.properties = properties;

  return playerStuff;
};

MonopolyPlayer.prototype.createFromJSONString = function(data) {
  MonopolyPlayer.super_.prototype.createFromJSONString.call(this, data);
  
  this.money = data.money;
  this.getOutOfJailFreeCards = data.getOutOfJailFreeCards;
  this.inJail = data.inJail;
  this.turnsInJail = data.turnsInJail;

  this.properties = [];
  for (var i = 0; i < data.properties.length; i++) {
    var property = PropertyFactory(data.properties[i].type);
    property.createFromJSONString(data.properties[i]);
    this.properties.push(property);
  }
};

module.exports = MonopolyPlayer;
