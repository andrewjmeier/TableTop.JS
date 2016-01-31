var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * A Token class
 * @constructor
 * @extends {Component}
 * @param {string} owner - The player who owns this token.
 * @param {Tile} tile - The tile where the token is being placed
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
*/
function Token(owner, color) {
  Component.call(this);
  this.owner = owner;
  this.color = color;
  this.isDead = false;
};

inherits(Token, Component);

/**
 * Remove the token from the board and player
 * @returns {void}
*/
Token.prototype.destroy = function() { 

  for (var i = 0; i < this.owner.tokens.length; i++) { 
    if (this.owner.tokens[i] == this) 
      this.owner.tokens.splice(i, 1);
  } 
  
  this.owner = null;
  this.tile = null;
  this.isDead = true;

};

module.exports = Token;
