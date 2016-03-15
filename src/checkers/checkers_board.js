// checkers_board.js
    var inherits = require('util').inherits;
    var TableTop = require("../../tabletop/tabletop.js");

    //constructor for CheckersBoard
    function CheckerBoard() { 
      TableTop.GridBoard.call(this, 8, 8);
      this.buildTiles();
      this.buildTokens();
    }       
    inherits(CheckerBoard, TableTop.GridBoard);

    //method to build tiles for the checkers board
    CheckerBoard.prototype.buildTiles = function() { 
      var tileColor = TableTop.Constants.blackColor;
      var tile;
      for (var y = 0; y < this.height; y++) {
        tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        for (var x = 0; x < this.width; x++) {
          tile = new TableTop.Tile({color: tileColor});
          this.tiles[x][y] = tile;
          tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        }
      } 
    };

    // function to actually build tokens
    CheckerBoard.prototype.buildTokens = function() { 

      // define coordinates for red and white tokens
      var blackX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
      var blackY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
      var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
      var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

      // build the tokens
      var tile;
      for (var i = 0; i < blackX.length; i++) { 

        tile = this.getTile(blackX[i], blackY[i]);
        this.buildTokenForTile(tile, "black");

        tile = this.getTile(whiteX[i], whiteY[i]);
        this.buildTokenForTile(tile, "white");
      }
    };

    // creates the token for given tile and color, adds it to the tile, 
    // and appends it to our list of tokens
    CheckerBoard.prototype.buildTokenForTile = function(tile, color) { 
      var token = new TableTop.Token(color);
      token.cssClass = color;
      tile.addToken(token);
      this.tokens.push(token);
    };

      CheckerBoard.prototype.getJSONString = function() {
    var tiles = [];
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++) {
        var tileText = this.tiles[x][y].getJSONString();
        tiles.push(tileText);
      }
    }
    return tiles;
  };

  CheckerBoard.prototype.createFromJSONString = function(data) {
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++) {
        var tile = this.tiles[x][y];
        tile.createFromJSONString(data[x + (this.width * y)]);
      }
    }
  };

module.exports = CheckerBoard;