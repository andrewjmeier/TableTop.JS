function Trade(proposing_player, answering_player, proposing_player_items, answering_player_items) {
  this.proposing_player = proposing_player;
  this.answering_player = answering_player;
  this.proposing_player_items = proposing_player_items;
  this.answering_player_items = answering_player_items;
};

Trade.prototype.completeTrade = function() {
  //make the answering items belong to proposing player
  //make the proposing items belong to answering player
};

module.exports = Trade;