should = require('chai').should(),
    Player = require('../src/player'),

describe('jail methods', function() {
  beforeEach(function() {
    Player.money = 500;
    Player.inJail = true;
    Player.turnsInJail = 1;
  });

  describe('#payBail', function() {
    it('takes the player out of jail and reduces money by 50', function() {
      Player.payBail();
      Player.inJail.should.eql(false);
      Player.turnsInJail.should.eql(0);
      Player.money.should.eql(450);
    });
  });

  describe('#getOutOfJailFree', function() {
    it('takes the player out of jail without reducing money by 50', function() {
      Player.getOutOfJailFree();
      Player.inJail.should.eql(false);
      Player.turnsInJail.should.eql(0);
      Player.money.should.eql(500);
    });
  });
});