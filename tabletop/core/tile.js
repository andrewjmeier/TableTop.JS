Component = require("./component.js");
    inherits = require('util').inherits;

function Tile(opts) {
  this.name = opts.name;
  this.color = opts.color;
  this.occupier = opts.occupier; // todo: make this an array of tokens
}

Tile.prototype.clearOccupiers = function() { 
  this.occupier = null;
};

Tile.prototype.addOccupier = function(occupier) { 
  this.occupier = occupier;
};

Tile.prototype.removeOccupier = function(occupier) { 
  this.occupier = null;
};

module.exports = Tile;
