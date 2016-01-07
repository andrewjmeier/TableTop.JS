var inherits = require('util').inherits;
// var Trade = require("../../tabletop/core/trade.js");
var TableTop = require('../../tabletop/tabletop');

function MonopolyTrade(proposingPlayer) {
  TableTop.Trade.call(this, proposingPlayer, null, {property: [], money: 0}, {property: [], money: 0});
};

inherits(MonopolyTrade, TableTop.Trade);

MonopolyTrade.prototype.addOrRemoveProperty = function(property) {
  if ((this.proposingPlayerItems.property.indexOf(property) > -1)||(this.answeringPlayerItems.property.indexOf(property) > -1)){
    //if it is in either then remove from that list
    this.removeProperty(property);
  }
  else{
    //if it is in neither then add to the correct one
    this.addProperty(property);
  }
};

MonopolyTrade.prototype.removeProperty = function(property) {
  if (property.owner == this.proposingPlayer) {
    this.removePropertyFromList(property, this.proposingPlayerItems.property);
    this.proposingPlayer.properties.push(property);
  }
  else if (property.owner == this.answeringPlayer) {
    this.removePropertyFromList(property, this.answeringPlayerItems.property);
    this.answeringPlayer.properties.push(property);
  }
};

MonopolyTrade.prototype.addProperty = function(property){
  if(property.owner == this.proposingPlayer){
    this.proposingPlayerItems.property.push(property);
    this.removePropertyFromList(property, this.proposingPlayer.properties);
  }
  else if (property.owner == this.answeringPlayer){
    this.answeringPlayerItems.property.push(property);
    this.removePropertyFromList(property, this.answeringPlayer.properties);
  }
};

MonopolyTrade.prototype.removePropertyFromList = function(property, propertyList) {
  var index = propertyList.indexOf(property);
  propertyList.splice(index, 1);
};

//test whether they have selected sufficient details for trade
//and if they have enough money
MonopolyTrade.prototype.allDetails = function() {
  //if either player isn't specified
  if(!this.proposingPlayer||!this.answeringPlayer) {
    return false;
  } 

  //if they aren't trading properties or money
  if (!this.proposingPlayerItems.property.length) {
    return false;
  }
  //if they aren't receiving properties or money
  if (!this.answeringPlayerItems.property.length) {
    return false;
  }

  //need to check if enough money
  if(this.proposingPlayerItems.money > 0 && this.proposingPlayer.money < this.proposingPlayerItems.money) {
    return false;
  }
  if(this.answeringPlayerItems.money > 0 && this.answeringPlayer.money < this.answeringPlayerItems.money) {
    return false;
  } 
  return true;
};

MonopolyTrade.prototype.addOrRemoveMoney = function(money) {
  // add money to answering player, remove from proposing
  if (money > 0) {
    this.proposingPlayerItems.money -= money;
    this.answeringPlayerItems.money += money;
  } else {
    this.proposingPlayerItems.money += money;
    this.answeringPlayerItems.money -= money;
  }
};

MonopolyTrade.prototype.itemsToString = function() {
  var my_prop_names = "";
  for (var i in this.proposingPlayerItems.property) {
      my_prop_names += this.proposingPlayerItems.property[i].name;
      my_prop_names += ", ";
  }
  var their_prop_names = "";
  for (var i in this.answeringPlayerItems.property) {
      their_prop_names += this.answeringPlayerItems.property[i].name;
      their_prop_names += ", ";
  }
  var my_money = "";
  var their_money = "";
  if (this.proposingPlayerItems.money > 0) {
    my_money = "$" + this.proposingPlayerItems.money + ", ";
  } else if(this.answeringPlayerItems.money > 0) {
    their_money = "$" + (this.answeringPlayerItems.money) + ", ";
  }

  return "" + "TRADING " + my_money + my_prop_names + "\nFOR " + their_money + their_prop_names;
};

module.exports = MonopolyTrade;
