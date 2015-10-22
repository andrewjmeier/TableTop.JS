should = require('chai').should(),
    Property = require('../../../src/monopoly/board/properties/property'),
Game = require("../../../src/monopoly/monopoly_game");
Player = require("../../../src/monopoly/monopoly_player");

describe('landing actions', function() {
  var player;
  var player2;
  var game;
  var property;
  beforeEach(function() {
    player = new Player("Joe");
    player2 = new Player("Sam");

    game = new Game([player, player2]);

    var propertyGroup = 4;
    property = new Property("Boardwalk", 400, propertyGroup);

  });

  describe('#perform landing action', function() {
    it('if player owns the property do nothing', function() {
      property.owner = player;
      player.properties.push(property);
      game.currentPlayer = 0;

      property.performLandingAction(game);
      player.money.should.eql(1500);
      player2.money.should.eql(1500);
      player.properties.length.should.eql(1);
      player2.properties.length.should.eql(0);
    });

/* commenting this test out for the time being since we're changing game loop
   stuff right now.

    it('it buys the property if the player can afford it', function() {
      game.currentPlayer = 1;

      property.performLandingAction(game);
      player2.money.should.eql(100);
      player2.properties[0].should.eql(property)
      ;
    });
*/

    it('pays rent if its owned', function() {
      game.currentPlayer = 1;
      property.owner = player;
      player.properties.push(property);
      property.getRent = function() { return 10; };
      property.performLandingAction(game);
      player2.money.should.eql(1490);
      player.money.should.eql(1510);
    });
  });
});
