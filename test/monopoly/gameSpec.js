should = require('chai').should(),
    Game = require('../../src/monopoly/monopoly_game'),
Player = require('../../src/monopoly/monopoly_player');
Board = require("../../src/monopoly/board_utils.js");


describe('Game Tests', function() {
  var game;
  var players = [new Player("Joe"), new Player("Steve"), new Player("Bob")];
  players[0].inJail = true;
  var board = new Board();

  beforeEach(function() {
    game = new Game(players, board);
  });

  describe('#randomizeCurrentPlayer', function() {
    it('picks a number between 0 and the length of the player array', function() {
      game.randomizeCurrentPlayer();
      game.currentPlayer.should.below(3);
    });
  });

  describe('#rollDice', function() {
    it('sets the dice array between 1 and 6 for one die', function() {
      game.rollDice(1);
      game.dice.length.should.eql(1);
      game.dice[0].should.below(7);
      game.dice[0].should.above(0);
    });

    it('sets the dice array between 1 and 8 for one die', function() {
      game.rollDice(1, 8);
      game.dice.length.should.eql(1);
      game.dice[0].should.below(9);
      game.dice[0].should.above(0);
    });

    it('sets the dice array between 1 and 6 for two dice', function() {
      game.rollDice(2);
      game.dice.length.should.eql(2);
      game.dice[0].should.below(7);
      game.dice[0].should.above(0);
      game.dice[1].should.below(7);
      game.dice[1].should.above(0);
    });
  });

  describe('#movePlayer', function() {

    before(function() {
      game.players[0].turnsInJail = 1;
    });

    beforeEach(function(){
      game.dice = [-1, 5]; // invalid dice roll, should get changed
      game.currentPlayer = 0;
    });

    it('increments turns in jail', function() {
      game.movePlayer();
      game.players[0].turnsInJail.should.eql(2);
    });


    it('pays bail on third roll', function() {
      game.movePlayer();
      game.players[0].inJail.should.eql(false);
    });
  });


  describe('#move', function() {
    beforeEach(function(){
      game.dice = [1, 5]; // invalid dice roll, should get changed
      game.currentPlayer = 0;
    });

    it('increments player position', function() {
      game.players[0].position = 5;
      game.move();
      game.players[0].position.should.eql(11);
    });

    it('loops the player position around 40', function() {
      game.players[0].position = 35;
      game.move();
      game.players[0].position.should.eql(1);
    });
  });


  describe('#isDoubles', function() {

    it('returns true when it is doubles', function() {
      var dice = [1, 1];
      game.isDoubles(dice).should.eql(true);
    });

    it('returns false when it isn\'t doubles', function() {
      var dice = [1, 2];
      game.isDoubles(dice).should.eql(false);
    });
  });

  describe('#nextPlayer', function() {
    beforeEach(function(){
      game.dice = [1, 5]; // invalid dice roll, should get changed
      game.currentPlayer = 0;
    });

    it('increments to the next player', function() {
      game.nextPlayer();
      game.currentPlayer.should.eql(1);
    });

    it('doesn\'t increment if it\'s doubles', function() {
      game.dice = [1,1];
      game.nextPlayer();
      game.currentPlayer.should.eql(0);
    });

    it('wraps around', function() {
      game.currentPlayer = 2;
      game.nextPlayer();
      game.currentPlayer.should.eql(0);
    })
  });
});
