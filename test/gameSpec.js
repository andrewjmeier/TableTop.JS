should = require('chai').should(),
    Game = require('../src/game'),

Game.players = [{name: "Joe", inJail: true, turnsInJail: 0, position: 5, releaseFromJail: function() {this.inJail = false}, payBail: function() {this.inJail = false}}, {name: "Bill"}, {name: "Steve"}];

describe('#randomizeCurrentPlayer', function() {
  it('picks a number between 0 and the length of the player array', function() {
    Game.randomizeCurrentPlayer();
    Game.currentPlayer.should.below(3);
  });
});

describe('#rollDice', function() {
  it('sets the dice array between 1 and 6 for one die', function() {
    Game.rollDice(1);
    Game.dice.length.should.eql(1);
    Game.dice[0].should.below(7);
    Game.dice[0].should.above(0);
  });

  it('sets the dice array between 1 and 8 for one die', function() {
    Game.rollDice(1, 8);
    Game.dice.length.should.eql(1);
    Game.dice[0].should.below(9);
    Game.dice[0].should.above(0);
  });

  it('sets the dice array between 1 and 6 for two dice', function() {
    Game.rollDice(2);
    Game.dice.length.should.eql(2);
    Game.dice[0].should.below(7);
    Game.dice[0].should.above(0);
    Game.dice[1].should.below(7);
    Game.dice[1].should.above(0);
  });
});

describe('#movePlayer', function() {
  beforeEach(function(){
    Game.dice = [-1, 5]; // invalid dice roll, should get changed
    Game.currentPlayer = 0;
  });

  it('increments turns in jail', function() {
    Game.movePlayer();
    Game.players[0].turnsInJail.should.eql(1);
  });

  it('rolls dice', function() {
    Game.movePlayer();
    Game.dice.should.not.eql([-1, 5]);
  });

  it('pays bail on third roll', function() {
    Game.movePlayer();
    Game.players[0].inJail.should.eql(false);
  });
});


describe('#move', function() {
  beforeEach(function(){
    Game.dice = [1, 5]; // invalid dice roll, should get changed
    Game.currentPlayer = 0;
  });

  it('increments player position', function() {
    Game.players[0].position = 5;
    Game.move();
    Game.players[0].position.should.eql(11);
  });

  it('loops the player position around 40', function() {
    Game.players[0].position = 35;
    Game.move();
    Game.players[0].position.should.eql(1);
  });
});


describe('#isDoubles', function() {

  it('returns true when it is doubles', function() {
    var dice = [1, 1];
    Game.isDoubles(dice).should.eql(true);
  });

  it('returns false when it isn\'t doubles', function() {
    var dice = [1, 2];
    Game.isDoubles(dice).should.eql(false);
  });
});

describe('#nextPlayer', function() {
  beforeEach(function(){
    Game.dice = [1, 5]; // invalid dice roll, should get changed
    Game.currentPlayer = 0;
  });

  it('increments to the next player', function() {
    Game.nextPlayer();
    Game.currentPlayer.should.eql(1);
  });

  it('doesn\'t increment if it\'s doubles', function() {
    Game.dice = [1,1];
    Game.nextPlayer();
    Game.currentPlayer.should.eql(0);
  });

  it('wraps around', function() {
    Game.currentPlayer = 2;
    Game.nextPlayer();
    Game.currentPlayer.should.eql(0);
  })
});