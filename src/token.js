/**
 * A Token class
 * @constructor
 * @param {string} owner - The player who owns this token.
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
 * @param position - Starting position
 * @param position.x - The x position
 * @param position.y - The y position
*/
function Token(owner, color, position) {
  this.owner = owner;
  this.position = position;
  this.oldPosition = NULL; // clarity
  this.color = color;
};

/**
 * Represents a Token.
 * @param position - The new position
 * @param position.x - The x position
 * @param position.y - The y position
*/

Token.prototype.setPosition = function(position) {
  this.oldPosition = this.position;
  this.position.x = position.x;
  this.position.y = position.y;
};

module.exports = Token;
