var should = require('chai').should();
var Deck = require('../src/deck');

describe('Deck Tests', function() {
  var deck;
  
  beforeEach(function() {
    deck = new Deck();
    deck.cards = [1,2,3,4];
  });

  describe('#drawCard', function() {
    it('returns item and leaves it in the deck', function() {
      var card = deck.drawCard(true);
      card.should.eql(1);
      deck.currentPosition.should.eql(1);
      deck.cards.length.should.eql(4);
    });

    it('returns item and removes it in the deck', function() {
      var card = deck.drawCard(false);
      card.should.eql(1);
      deck.currentPosition.should.eql(0);
      deck.cards.length.should.eql(3);
      deck.cards.should.eql([2,3,4]);
    });
  });
});
