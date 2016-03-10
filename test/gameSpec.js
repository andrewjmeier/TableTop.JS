var should = require('chai').should();
var Game = require('../tabletop/core/game');
var Player = require('../tabletop/core/player');
var Board = require('../tabletop/core/board');
var Turn = require('../tabletop/core/turn');
var c = require('../tabletop/core/ttConstants');

describe('Game Tests', function() {
  var game;
  var board = new Board();

  beforeEach(function() {
    game = new Game(board);
    game.players = [{name: "joe"}];
  });

  describe('#setMoveType', function() {
    it('set the move type of the game', function() {
      game.setMoveType(1);
      game.moveType.should.eq(1);
    });
  });

  describe('#setPlayers', function() {

    it('set the game players', function() {
      var players = [1, 2, 3, 4, 5, 6];
      game.setPlayers(players);
      game.players.should.eq(players);
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
      game.players = [1, 2, 3];
      game.dice = [1, 5]; // invalid dice roll, should get changed
      game.currentPlayer = 0;
    });

    it('increments to the next player', function() {
      game.nextPlayer();
      game.currentPlayer.should.eql(1);
    });

    it('wraps around', function() {
      game.currentPlayer = 2;
      game.nextPlayer();
      game.currentPlayer.should.eql(0);
    })
  });

  describe('#randomizeCurrentPlayer', function() {
    it('selects a random player to be current player', function() {
      game.players = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      game.randomizeCurrentPlayer();
      game.currentPlayer.should.above(-1);
      game.currentPlayer.should.below(9);
    });
  });

  describe('#setProposedMoveDestination', function() {
    it('sets the destination property of the proposed move to the correct tile', function() {
      var tile = {name: "a tile"};
      game.setProposedMoveDestination(tile);
      game.proposedMove.destination.should.eq(tile);
    });
  });

  describe('#setProposedMoveToken', function() { 
    it('sets the token property of the proposed move', function() {
      var token = {name: "thimble"};
      game.setProposedMoveToken(token);
      game.proposedMove.token.should.eq(token);
    });
  });

  describe('#hasValidMove', function() {

    describe('when moveType is moveTypeManual', function() {

      beforeEach(function(){
        game.moveType = c.moveTypeManual;
        game.isValidMove = function() {
          return true;
        }
      });

      it('returns false if the token is missing', function() {
        game.proposedMove = {
          token: null,
          destination: 5
        };
        game.hasValidMove().should.eq(false);
      });

      it('returns false if the destination is missing', function() {
        game.proposedMove = {
          token: 5,
          destination: null
        };
        game.hasValidMove().should.eq(false);
      });

      it('returns true if both token and destination are present (assuming that it isValidMove', function() {
        game.proposedMove = {
          token: 5,
          destination: 6
        };
        game.hasValidMove().should.eq(true);
      });
    });

    describe('when moveType is moveTypePlaceToken', function() {

      beforeEach(function(){
        game.moveType = c.moveTypePlaceToken;
        game.isValidMove = function() {
          return true;
        }
      });

      it('returns true if the token is missing', function() {
        game.proposedMove = {
          token: null,
          destination: 5
        };
        game.hasValidMove().should.eq(true);
      });

      it('returns false if the destination is missing', function() {
        game.proposedMove = {
          token: 5,
          destination: null
        };
        game.hasValidMove().should.eq(false);
      });

      it('returns true if both token and destination are present (assuming that it isValidMove', function() {
        game.proposedMove = {
          token: 5,
          destination: 6
        };
        game.hasValidMove().should.eq(true);
      });
    });
  });

  describe('#getPlayerForToken', function() {
    it('returns the player who has the given token in its token list', function() {
      var player1 = {tokens: [1, 2, 3]};
      var player2 = {tokens: [4, 5, 6]};
      var player3 = {tokens: [7, 8, 9]};
      var player4 = {tokens: [10, 11, 12]}; 
      var players = [
        player1, player2, player3, player4 
      ];
      game.players = players;
      game.getPlayerForToken(7).should.eq(player3);
    });
  });

  describe('#destroyToken', function() {

    var mockPlayer1 = {
      tokens: [1, 2, 3],

      destroyToken: function(token) {
        for (var i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i] == token) {
            this.tokens.splice(i, 1);
            return;
          }
        }
      }
    }

    var mockPlayer2 = {
      tokens: [1, 2, 3],

      destroyToken: function(token) {
        for (var i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i] == token) {
            this.tokens.splice(i, 1);
            return;
          }
        }
      }
    }

    var mockPlayer3 = {
      tokens: [1, 2, 3],

      destroyToken: function(token) {
        for (var i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i] == token) {
            this.tokens.splice(i, 1);
            return;
          }
        }
      }
    }

    var mockBoard = {
      tokens: [1, 2, 3],

      destroyToken: function(token) {
        for (var i = 0; i < this.tokens.length; i++) {
          if (this.tokens[i] == token) {
            this.tokens.splice(i, 1);
            return;
          }
        }
      }
    }


    it('destroys the token from the player and the board', function() {
      game.players = [mockPlayer1, mockPlayer2, mockPlayer3];
      game.board = mockBoard;
      game.destroyToken(2);
      mockBoard.tokens.length.should.eq(2);
      mockBoard.tokens[1].should.eq(3);

      mockPlayer1.tokens.length.should.eq(2);
      mockPlayer1.tokens[1].should.eq(3);

      mockPlayer2.tokens.length.should.eq(2);
      mockPlayer2.tokens[1].should.eq(3);

      mockPlayer3.tokens.length.should.eq(2);
      mockPlayer3.tokens[1].should.eq(3);
    })
  })

});
