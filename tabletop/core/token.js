var Component = require("./component.js");
var inherits = require('util').inherits;

idCounter = 0;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

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
  this.id = guid(); //"token" + idCounter;
  this.color = color;
  this.isDead = false;
};

inherits(Token, Component);


Token.prototype.getJSONString = function() {

  return {
    color: this.color,
    isDead: this.isDead,
    id: this.id,
    type: "Token"
  }
};

Token.prototype.createFromJSONString = function(data) {
  this.color = data.color;
  this.isDead = data.isDead;
  this.id = data.id;
};


module.exports = Token;