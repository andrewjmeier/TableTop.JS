var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * The Card class
 * @constructor
 * @extends {Component}
 * @param {string} text - The card's message
 * @param {function} action - An action to be taken when the card is drawn. action should take the game state as a parameter
*/
function Card(text, action) {
  Component.call(this);
  this.text = text;
  this.action = action;
};

inherits(Card, Component);

module.exports = Card;