/**
 * A Token class
 * @constructor
 * @param {string} owner - The player who owns this token.
 * @param {string} [color=COLOR_BLACK] - Token color. See constants.js.
*/
function Token(owner, tile, color) {
  this.owner = owner;
  this.tile = tile;
  this.color = color;
  this.isDead = false;
};


// sets variables for token, calls tile functions
Token.prototype.setTile = function(tile) { 
  this.tile = tile;
};

Token.prototype.destroy = function() { 

  for (var i = 0; i < this.owner.tokens.length; i++) { 
    if (this.owner.tokens[i] == this) 
      this.owner.tokens.splice(i, 1);
  } 
  
  this.tile.removeOccupier(this);
  this.owner = null;
  this.tile = null;
  this.isDead = true;

};

Token.prototype.moveToTile = function(tile) {
  this.tile.removeOccupier(this);
  this.setTile(tile);
  tile.addOccupier(this);
};

module.exports = Token;
