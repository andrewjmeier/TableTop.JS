/**
 * A Player class
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

/**
 * Represents a Player.
 * @param {int} position - The new position (index on the board) to move the player to
*/
Player.prototype.moveTo = function(position) {
  this.position = position;
};

module.exports = Player;