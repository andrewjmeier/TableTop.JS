/**
 * Represents a Player.
 * @constructor
 * @param {string} name - The player's name.
 * @param {int} number - The player's number.
*/
function Player(name, number) {
  this.name = name;
  // TODO - this should be refactored to be an array of tokens for the player
  this.tokens = [];
  this.position = 0;
  this.color = number;
};

Player.prototype.moveTo = function(position) {
  this.position = position;
};

module.exports = Player;