var Component = require("./component.js");
var inherits = require('util').inherits;

idCounter = 0;
/**
 * A Token class
 * @constructor
 * @extends {Component}
 * @param {string} owner - The player who owns this token.
 * @param {Tile} tile - The tile where the token is being placed
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
*/
function Token(color) {
  Component.call(this);
  this.uniqueId = "token" + idCounter++;
  this.color = color;
  this.isDead = false;
};

inherits(Token, Component);


Token.prototype.getJSONString = function() {

  return {
    color: this.color,
    isDead: this.isDead,
    type: "Token"
  }
};

Token.prototype.createFromJSONString = function(data) {
  this.color = data.color;
  this.isDead = data.isDead;
};


module.exports = Token;