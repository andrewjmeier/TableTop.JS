var inherits = require('util').inherits;
var Trade = require("../trade.js");

function MonopolyTrade(proposing_player) {

  this.proposing_player = proposing_player;
  this.answering_player = null;
  this.proposing_player_items = [];
  this.answering_player_items = [];
  // this.proposing_player_items = getPropOrAnsProperties(trade_properties, true);
  // this.answering_player_items = getPropOrAnsProperties(trade_properties, false);

  Trade.call(this, this.proposing_player, this.answering_player, this.proposing_player_items, this.answering_player_items);
};

inherits(MonopolyTrade, Trade);

//this is no longer used
MonopolyTrade.prototype.getPropOrAnsProperties = function(all_items, is_posposing_player) {
  items = [];
  //it item is owned by that player then put it in their list
  if(is_posposing_player){
    for(var index in all_items){
      if(all_items[index].owner == this.proposing_player){
        items.push(all_items[index]);
      }
    }
  }
  else{
    for(var index in all_items){
      if(all_items[index].owner == this.answering_player){
        items.push(all_items[index]);
      }
    }
  }
  return items;
};

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
  //else belong to neither of the 
};

MonopolyTrade.prototype.addProperty = function(property){
  if(property.owner == this.proposing_player){
    console.log("Adding property" + property.name);
    this.proposing_player_items.push(property);
  }
  else if (property.owner == this.answering_player){
    this.answering_player_items.push(property);
  }
  //else belong to neither of the 
};

MonopolyTrade.prototype.allDetails = function(){
  if(!this.proposing_player||!this.answering_player||this.proposing_player_items.length == 0||this.answering_player_items == 0){
    return false;
  }
  return true;
};

MonopolyTrade.prototype.propsToString = function(){
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
  return "" + "TRADING " + my_prop_names + "\nFOR " + their_prop_names;

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
};

module.exports = MonopolyTrade;
