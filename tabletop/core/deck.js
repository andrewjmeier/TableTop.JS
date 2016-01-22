var Utils = require("./utils");
var Component = require("./component.js");
var inherits = require('util').inherits;

/**
 * The Deck class
 * Should probably be subclassed to create the cards for the deck in the constructor
 * @constructor
 * @extends {Component}
*/
function Deck() {
  Component.call(this);
  this.cards = [];
  this.currentPosition = 0;
};

inherits(Deck, Component);

/**
 * Shuffle the deck in place
 * @returns {void}
*/
Deck.prototype.shuffle = function() {
  Utils.shuffle(this.cards);
};

// draw card currently assumes that the card goes back on the bottom of the deck
// doesn't quite work for get out of jail, but will for everything else.
// In the future we could build two types of decks or two different draw methods
/**
 * @param {Boolean} isReplaced - Whether or not the card should be replaced at the bottom of the deck
 * @returns {Card} The card drawn from the deck
*/
Deck.prototype.drawCard = function(isReplaced) {
  var card = this.cards[this.currentPosition];
  if (isReplaced) {
    this.currentPosition++;

    // wrap index of the card around
    this.currentPosition = this.currentPosition % this.cards.length;
  } else {
    this.cards.splice(this.currentPosition, 1);
  }
  
  return card;
};

module.exports = Deck;