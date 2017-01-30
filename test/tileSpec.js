var should = require('chai').should();
var Tile = require('../tabletop/core/tile');

describe('Tile Tests', function() {
  var tile;

  // beforeEach(function() {
    
  // });

  describe('#Tile', function() {
    it('creates a new tile if no options are passed', function() {
      tile = new Tile();
      tile.name.should.eq("");
      tile.color.should.eq(0x000000);
      tile.tokens.length.should.eq(0);
    });

    it('creates a new tile with a name and color', function() {
      tile = new Tile({"name": "Test tile", "color": 0x00ff00})
      tile.name.should.eq("Test tile");
      tile.color.should.eq(0x00ff00);
      tile.tokens.length.should.eq(0);
    })
  });

});
