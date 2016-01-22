/**
 * A Trade class
 * @constructor
 * @param {Player} proposingPlayer - The player starting the trade
 * @param {Player} answeringPlayer - The player responding to the trade
 * @param {Dictionary} proposingPlayerItems - The proposing player's items in the trade
 * @param {Dictionary} answeringPlayerItems - The answering player's items in the trade
*/
function Trade(proposingPlayer, answeringPlayer, proposingPlayerItems, answeringPlayerItems) {
  this.proposingPlayer = proposingPlayer;
  this.answeringPlayer = answeringPlayer;
  this.proposingPlayerItems = proposingPlayerItems;
  this.answeringPlayerItems = answeringPlayerItems;
};

/**
 * Execute the trade and swap the players' items
 * @returns {void}
*/
Trade.prototype.completeTrade = function() {
  this.proposingPlayer.addItems(this.answeringPlayerItems);
  this.answeringPlayer.addItems(this.proposingPlayerItems);
};

/**
 * Add the objects back to their respective players 
 * @returns {void}
*/
Trade.prototype.cancelTrade = function() {
  this.proposingPlayer.addItems(this.proposingPlayerItems);
  this.answeringPlayer.addItems(this.answeringPlayerItems);
};

module.exports = Trade