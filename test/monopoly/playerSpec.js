should = require('chai').should(),
    Player = require('../../src/monopoly/monopoly_player'),

describe('jail methods', function() {
  var player;

  beforeEach(function() {
    player = new Player("Joe");
    player.money = 500;
    player.inJail = true;
    player.turnsInJail = 1;
    player.getOutOfJailFreeCards = 1;
  });

  describe('#payBail', function() {
    it('takes the player out of jail and reduces money by 50', function() {
      player.payBail();
      player.inJail.should.eql(false);
      player.turnsInJail.should.eql(0);
      player.money.should.eql(450);
    });
  });

  describe('#getOutOfJailFree', function() {
    it('takes the player out of jail without reducing money by 50', function() {
      player.getOutOfJailFree();
      player.inJail.should.eql(false);
      player.turnsInJail.should.eql(0);
      player.money.should.eql(500);
      player.getOutOfJailFreeCards.should.eql(0);
    });
  });
});