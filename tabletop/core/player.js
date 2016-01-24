var Component = require("./component.js");
var inherits = require('util').inherits;

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
 * Represents a Player.
 * @param {int} position - The new position (index on the board) to move the player to
*/
Player.prototype.moveTo = function(position) {
  this.position = position;
};

/**
 * Add items to a player
 * This is used by the trade (but could be used elsewhere as well)
 * @abstract
 * @param {Dictionary} items - a dictionary of items to be added to the player
*/
Player.prototype.addItems = function(items) {
  throw new Error('must be implemented by subclass!');
};

module.exports = Player;
