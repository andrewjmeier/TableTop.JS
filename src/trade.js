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

//I think this would be a good method to have in eventually but requires more abstraction on other parts
/**
 * Execute the trade and swap the players' items
*/
Trade.prototype.completeTrade = function() {
  this.proposingPlayer.addItems(this.answeringPlayerItems);
  this.answeringPlayer.addItems(this.proposingPlayerItems);
};

module.exports = Trade