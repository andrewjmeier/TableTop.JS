var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * The Tile class
 * @constructor
 * @extends {Component}
 * @param {Dictionary} - name {string}, color {hex}, occupier {Token}
*/
// TODO refactor parameters
function Tile(opts) {
  Component.call(this);
  this.name = opts.name;
  this.color = opts.color;
  this.occupier = opts.occupier; // todo: make this an array of tokens
};

inherits(Tile, Component);

/**
 * Remove all tokens from the Tile
 * @returns {void}
*/
Tile.prototype.clearOccupiers = function() { 
  this.occupier = null;
};

/**
 * Add a Token to the Tile
 * @param {Token} occupier - token to be added
 * @returns {void}
*/
Tile.prototype.addOccupier = function(occupier) { 
  this.occupier = occupier;
};

/**
 * Remove a Token from the Tile
 * @param {Token} occupier - token to be remvoed
 * @returns {void}
*/
Tile.prototype.removeOccupier = function(occupier) { 
  this.occupier = null;
};

module.exports = Tile;
