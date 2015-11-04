var inherits = require('util').inherits;
var Trade = require("../trade.js");

function MonopolyTrade(proposing_player) {

  this.proposing_player = proposing_player;
  this.answering_player = null;
  this.proposing_player_items = [];
  this.answering_player_items = [];
  this.money = 0;

  Trade.call(this, this.proposing_player, this.answering_player, this.proposing_player_items, this.answering_player_items);
};

inherits(MonopolyTrade, Trade);

MonopolyTrade.prototype.addOrRemoveProperty = function(property){
  if ((this.proposing_player_items.indexOf(property) > -1)||(this.answering_player_items.indexOf(property) > -1)){
    //if it is in either then remove from that list
    this.removeProperty(property);
  }
  else{
    //if it is in neither then add to the correct one
    this.addProperty(property);
  }
}

MonopolyTrade.prototype.removeProperty = function(property){
  if(property.owner == this.proposing_player){
    var index = this.proposing_player_items.indexOf(property);
    this.proposing_player_items.splice(index, 1);
  }
  else if (property.owner == this.answering_player){
    var index = this.answering_player_items.indexOf(property);
    this.answering_player_items.splice(index, 1);
  }
};

MonopolyTrade.prototype.addProperty = function(property){
  if(property.owner == this.proposing_player){
    this.proposing_player_items.push(property);
  }
  else if (property.owner == this.answering_player){
    this.answering_player_items.push(property);
  }
};

//test whether they have selected sufficient details for trade
//and if they have enough money
MonopolyTrade.prototype.allDetails = function(){
  //if either player isn't specified
  if(!this.proposing_player||!this.answering_player){
    return false;
  } 
  //if they aren't trading properties or money
  if(this.proposing_player_items.length == 0 && this.money <= 0){
    return false;
  }
  //if they aren't receiving properties or money
  if(this.answering_player_items.length == 0 && this.money >= 0){
    return false;
  }

  //need to check if enough money
  if(this.money > 0 && this.proposing_player.money < this.money){
    return false;
  }
  if(this.money < 0 && this.answering_player.money + this.money < 0){
    return false;
  } 
  return true;
};

MonopolyTrade.prototype.itemsToString = function(){
  var my_prop_names = "";
  for (var i in this.proposing_player_items){
      my_prop_names += this.proposing_player_items[i].name;
      my_prop_names += ", ";
  }
  var their_prop_names = "";
  for (var i in this.answering_player_items){
      their_prop_names += this.answering_player_items[i].name;
      their_prop_names += ", ";
  }
  var my_money = "";
  var their_money = "";
  if(this.money > 0){
    my_money = "$" + this.money + ", ";
  } else if(this.money < 0){
    their_money = "$" + (-this.money) + ", ";
  }

  return "" + "TRADING " + my_money + my_prop_names + "\nFOR " + their_money + their_prop_names;

};

MonopolyTrade.prototype.completeTrade = function() {
  //swap items
  for (var i in this.proposing_player_items){
      this.answering_player.properties.push(this.proposing_player_items[i]);
      this.proposing_player.removeProperty(this.proposing_player_items[i]);
      this.proposing_player_items[i].owner = this.answering_player;
  }
  for (var i in this.answering_player_items){
      this.proposing_player.properties.push(this.answering_player_items[i]);
      this.answering_player.removeProperty(this.answering_player_items[i]);
      this.answering_player_items[i].owner = this.proposing_player;
  }
  //make payment
  if(this.money > 0){
    this.proposing_player.makePayment(this.money);
    this.answering_player.makeDeposit(this.money);
  } else if(this.money < 0){
    this.answering_player.makePayment(-this.money);
    this.proposing_player.makeDeposit(-this.money);
  }
};

module.exports = MonopolyTrade;
