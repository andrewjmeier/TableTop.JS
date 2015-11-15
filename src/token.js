/**
 * A Token class
 * @constructor
 * @param {string} owner - The player who owns this token.
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
*/
function Token(owner, space, color) {
  this.owner = owner;
  this.space = space;
  this.color = color;
  this.isDead = false;
};


// sets variables for token, calls space functions
Token.prototype.setSpace = function(space) { 
  this.space = space;
};

Token.prototype.destroy = function() { 

  for (var i = 0; i < this.owner.tokens.length; i++) { 
    if (this.owner.tokens[i] == this) 
      this.owner.tokens.splice(i, 1);
  } 
  
  this.space.removeOccupier(this);
  this.owner = null;
  this.space = null;
  this.isDead = true;

};

module.exports = Token;
