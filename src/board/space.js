function Space(name) {
  this.name = name;
  this.occupier = null; // todo: make this an array of tokens
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
