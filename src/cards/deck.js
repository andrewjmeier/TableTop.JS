Utils = require("../utils");

function Deck() {
  this.cards = [];
  this.currentPosition = 0;
};

Deck.prototype.shuffle = function() {
  Utils.shuffle(this.cards);
};

// draw card currently assumes that the card goes back on the bottom of the deck
// doesn't quite work for get out of jail, but will for everything else.
// In the future we could build two types of decks or two different draw methods
Deck.prototype.drawCard = function() {
  var card = this.cards[this.currentPosition];
  this.currentPosition++;

  // wrap index of the card around
  this.currentPosition = this.currentPosition % this.cards.length;
  return card;
};

module.exports = Deck;
