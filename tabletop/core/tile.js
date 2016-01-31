var Component = require("./component.js");
var inherits = require('util').inherits;
var _ = require('lodash');

/**
 * The Tile class
 * @constructor
 * @extends {Component}
 * @param {Dictionary} - name {string}, color {hex}, tokens {Array | Token}
*/
// TODO refactor parameters
function Tile(opts) {
  Component.call(this);
  this.name = opts.name;
  this.color = opts.color;
  this.tokens = [];
};

inherits(Tile, Component);

/**
 * Remove all tokens from the Tile
 * @returns {void}
*/
Tile.prototype.clearTokens = function() { 
  this.tokens = null;
};

/**
 * Add a Token to the Tile
 * @param {Token} token - token to be added
 * @returns {void}
*/
Tile.prototype.addToken = function(token) { 
  this.tokens.push(token);
};

/**
 * Remove a Token from the Tile
 * @param {Token} token - token to be remvoed
 * @returns {void}
*/
Tile.prototype.removeToken = function(token) { 
  _.remove(this.tokens, function(n) {
    return n === token;
  });
};

Tile.prototype.hasToken = function(token) {
  return _.find(this.tokens, function(n) {
    return n === token;
  });
};

module.exports = Tile;
