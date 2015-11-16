function Space(opts) {
  this.name = opts.name;
  this.color = opts.color;
  this.occupier = opts.occupier; // todo: make this an array of tokens
}

Space.prototype.clearOccupiers = function() { 
  this.occupier = null;
};

Space.prototype.addOccupier = function(occupier) { 
  this.occupier = occupier;
};

Space.prototype.removeOccupier = function(occupier) { 
  this.occupier = null;
};

module.exports = Space;
