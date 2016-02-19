var Component = require("./component.js");
var inherits = require('util').inherits;
var Token = require("./token.js");
var _ = require('lodash');

/**
 * A Player class
 * @constructor
 * @extends {Component}
 * @param {string} name - The player's name.
 * @param {hex} color - A hex color for the player's tokens.
*/
function Player(name, color) {
  Component.call(this);
  this.name = name;
  this.tokens = [];
  this.position = 0;
  this.color = color;
};

inherits(Player, Component);

/**
 * Add items to a player
 * This is used by the trade (but could be used elsewhere as well)
 * @abstract
 * @param {Dictionary} items - a dictionary of items to be added to the player
*/
Player.prototype.addItems = function(items) {
  throw new Error('must be implemented by subclass!');
};

Player.prototype.destroyToken = function(token) {
  _.remove(this.tokens, function(t) {
    return t == token;
  });

  token.isDead = true;
};

Player.prototype.getJSONString = function() {

  var tokenArray = [];
  for (var i = 0; i < this.tokens.length; i++) {
    var tokenText = this.tokens[i].getJSONString();
    tokenArray.push(tokenText);
  }

  return {
    name: this.name,
    position: this.position,
    color: this.color,
    tokens: tokenArray
  }
};

Player.prototype.createFromJSONString = function(data) {
  this.name = data.name;
  this.position = data.position;
  this.color = data.color;

  for (var i = 0; i < data.tokens.length; i++) {
    var token = new Token();
    token.createFromJSONString(data.tokens[i]);
    this.tokens.push(token);
  }
};

module.exports = Player;
