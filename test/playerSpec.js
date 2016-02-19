var should = require('chai').should();
var Player = require('../tabletop/core/player');

describe('Player tests', function() {
  var player;

  beforeEach(function() {
    player = new Player("Joe");
    player.tokens = [1, 2, 3, 4, 5, 6];
  });

  describe('#destroyToken', function() {
    it('destroys a token from the players list of tokens', function() {
      player.destroyToken(3);
      player.tokens.length.should.eq(5);
      player.tokens[2].should.eq(4);
    });
  });
});