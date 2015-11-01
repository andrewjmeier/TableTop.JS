should = require('chai').should();

var Player = require('../../src/settlers/settlers_player');

describe('player tests', function() {
  var player;

  beforeEach(function() {
    player = new Player("Joe");
    player.cards = {
      0: 5,
      1: 5,
      2: 5,
      3: 5,
      4: 5
    };
    player.settlementsRemaining = 5;
    player.citiesRemaining = 4;
    player.roadsRemaining = 15;
  });

  describe('#canBuySettlement', function() {
    it('check to see if player has resources to buy a settlement', function() {
      player.canBuySettlement().should.eql(true);
    });

    it('can not buy if no settlements remaining' , function() {
      player.settlementsRemaining = 0;
      player.canBuySettlement().should.eql(false);
    });

    it('can not buy if missing a resource', function() {
      player.cards[2] = 0;
      player.canBuySettlement().should.eql(false);
    });
  });

  describe('#buySettlement', function() {
    it('reduce resources and settlement count', function() {
      player.buySettlement();
      player.cards[0].should.eql(4);
      player.cards[1].should.eql(4);
      player.cards[2].should.eql(4);
      player.cards[3].should.eql(4);
      player.cards[4].should.eql(5);
      player.settlementsRemaining.should.eql(4);
    });
  });

describe('#canBuyCity', function() {
    it('check to see if player has resources to buy a city', function() {
      player.canBuyCity().should.eql(true);
    });

    it('can not buy if no cities remaining' , function() {
      player.citiesRemaining = 0;
      player.canBuyCity().should.eql(false);
    });

    it('can not buy if missing a resource', function() {
      player.cards[3] = 0;
      player.canBuyCity().should.eql(false);
    });
  });

  describe('#buyCity', function() {
    it('reduce resources and city count', function() {
      player.buyCity();
      player.cards[0].should.eql(5);
      player.cards[1].should.eql(5);
      player.cards[2].should.eql(5);
      player.cards[3].should.eql(3);
      player.cards[4].should.eql(2);
      player.citiesRemaining.should.eql(3);
    });
  });

describe('#canBuyRoad', function() {
    it('check to see if player has resources to buy a road', function() {
      player.canBuyRoad().should.eql(true);
    });

    it('can not buy if no roads remaining' , function() {
      player.roadsRemaining = 0;
      player.canBuyRoad().should.eql(false);
    });

    it('can not buy if missing a resource', function() {
      player.cards[0] = 0;
      player.canBuyRoad().should.eql(false);
    });
  });

  describe('#buyRoad', function() {
    it('reduce resources and road count', function() {
      player.buyRoad();
      player.cards[0].should.eql(4);
      player.cards[1].should.eql(4);
      player.cards[2].should.eql(5);
      player.cards[3].should.eql(5);
      player.cards[4].should.eql(5);
      player.roadsRemaining.should.eql(14);
    });
  });

describe('#canBuyDevelopmentCard', function() {
    it('check to see if player has resources to buy a devo card', function() {
      player.canBuyDevelopmentCard().should.eql(true);
    });

    it('can not buy if missing a resource', function() {
      player.cards[2] = 0;
      player.canBuySettlement().should.eql(false);
    });
  });

  describe('#buyDevelopmentCard', function() {
    it('reduce resources', function() {
      player.buyDevelopmentCard();
      player.cards[0].should.eql(5);
      player.cards[1].should.eql(5);
      player.cards[2].should.eql(4);
      player.cards[3].should.eql(4);
      player.cards[4].should.eql(4);
    });
  });

});