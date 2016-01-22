var c = require("./ttConstants.js");
var GridBoard = require("./grid_board.js");
var ArrayBoard = require('./array_board.js');
var PIXI = require("../../lib/pixi/pixi.js");
var Component = require("./component");
var inherits = require('util').inherits;

/**
 * The View class
 * @constructor
 * @param {Game} game - the game state
 * @param {TurnMap} turnMap - the state machine
 * @extends {Component}
*/
function View(game, turnMap) {
  Component.call(this);
  this.game = game;
  this.turnMap = turnMap;
  this.turnMap.updateState("start");
  this.tokenViews = [];
  this.tileViews = [];
  this.boardView = new PIXI.Graphics();
  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(c.canvasWidth, c.canvasHeight, 
                                          { transparent: true });
  document.body.appendChild(this.renderer.view);
  
  if (game.board instanceof GridBoard) { 
    for (var i = 0; i < this.game.board.height; i++) { 
      this.tileViews[i] = [];
    } 
  } 
};

inherits(View, Component);

/**
 * Draw the board for the given board type
 * @returns {void}
*/
View.prototype.drawBoard = function() { 
  if (this.game.board instanceof GridBoard) 
    this.drawGridBoard();
  else if (this.game.board instanceof ArrayBoard) {
    this.drawArrayBoard();
  }
  /* todo: 

   else if (this.game.board instanceof GraphBoard)
     this.drawGraphBoard();
   else 
     do nothing and defer drawing to user? 

   */
};

/**
 * Draw the grid board type
 * @returns {void}
*/
View.prototype.drawGridBoard = function() {
  
  this.boardView.x = c.boardStartX;
  this.boardView.y = c.boardStartY;
  this.boardView.beginFill(c.blueColor, 1);
  this.boardView.drawRect(0, 0, c.boardWidth, c.boardHeight);
  this.stage.addChild(this.boardView);
  this.drawTiles();
  this.drawTokens();
  this.drawMessage();
  this.animate();
};

/**
 * Draw the array board type
 * @returns {void}
*/
View.prototype.drawArrayBoard = function() {

  this.boardView.x = c.boardStartX;
  this.boardView.y = c.boardStartY;
  this.boardView.beginFill(c.blueColor, 1);
  this.boardView.drawRect(0, 0, c.boardWidth, c.boardHeight);
  this.stage.addChild(this.boardView);
  this.drawArrayTiles();
  this.drawTokens();
  this.drawMessage();
  this.animate();

};

/**
 * draw the tiles for an Array Board
 * @returns {void}
*/
View.prototype.drawArrayTiles = function() {
  var tileWidth = c.boardWidth / this.game.board.width;
  var tileHeight = c.boardHeight / this.game.board.height;
  
  var tileNum = 0;

  for (var x = 0; x < this.game.board.width; x++) {
    tileNum = this.createTileView(tileNum, x * tileWidth, 0, tileWidth, tileHeight);
  }

  for (var y = 1; y < this.game.board.height; y++) {
    tileNum = this.createTileView(tileNum, c.boardWidth - tileWidth, y * tileHeight, tileWidth, tileHeight);
  }

  for (var x = this.game.board.width - 2; x >= 0; x--) {
    tileNum = this.createTileView(tileNum, x * tileWidth, c.boardHeight - tileHeight, tileWidth, tileHeight);
  }

  for (var y = this.game.board.height - 2; y > 0; y--) {
    tileNum = this.createTileView(tileNum, 0, y * tileHeight, tileWidth, tileHeight);
  }

};

/** 
 * Create a view for a tile, place it at the right location
 * @param {int} tileNum - index of the tile on the board
 * @param {int} x - x location of the tile
 * @param {int} y - y location of the tile
 * @param {int} width - width of the tile
 * @param {int} height - height of the tile
 * @returns {PIXI.Graphics} tileView
*/
View.prototype.createTileView = function(tileNum, x, y, width, height) {
  var tile = this.game.board.getTile(tileNum);
  var tileView = this.drawTile(tile, {width: width, height: height});
  tileView.x = x;
  tileView.y = y;
  this.tileViews[tileNum] = tileView;
  this.boardView.addChild(tileView);
  return tileNum + 1;
};

// todo 
View.prototype.drawGraphBoard = function() {

};

/**
 * Draw a single tile
 * Override this method in your subclass to customize the board
 * @param {Tile} tile - the tile model object
 * @param {Dictionary} size - The width and height for the tile
 * @returns {PIXI.Graphics} tileView
*/
View.prototype.drawTile = function(tile, size) { 

  console.log("Using default drawTile()");
  var tileView = new PIXI.Graphics();
  tileView.lineStyle(1, 0, 1);
  tileView.beginFill(tile.color, 1);
  tileView.drawRect(0, 0, size.width, size.height);
  return tileView;
};

/**
 * Draw tile for the grid board
 * @returns {void}
*/
View.prototype.drawTiles = function() {

  var tileWidth = c.boardWidth / this.game.board.tiles[0].length;
  var tileHeight = c.boardHeight / this.game.board.tiles.length;
  var y_pos = c.boardHeight;
  var x_pos = 0;
  
  for (var y = 0; y < this.game.board.tiles.length; y++) {
    x_pos = 0;
    y_pos -= tileHeight;
    for (var x = 0; x < this.game.board.tiles[0].length; x++) {

      var tile = this.game.board.getTile(x, y);
      var tileView = this.drawTile(tile, {width: tileWidth, height:tileHeight});
      tileView.x = x_pos;
      tileView.y = y_pos;
      
      if (this.game.moveType == c.moveTypeManual || this.game.moveType == c.moveTypePlaceToken) { 
        tileView.interactive = true;
        var context = this;
        tileView.click = function(mouseData) {
          var selectedTile;
          for (var i = 0; i < context.tileViews.length; i++) {
            for (var j = 0; j < context.tileViews[0].length; j++) { 
              if (context.tileViews[i][j] == this) { 
                selectedTile = context.game.board.getTile(i, j);
              }
            }
          }
          
          context.game.tileClicked(selectedTile);
        };
      } 
      
      this.tileViews[x][y] = tileView;
      this.boardView.addChild(tileView);
      
      x_pos += tileWidth;
    }
  }
};

// draws token, puts it on appropriate tile,
// adds it to tokenViews
/** 
 * Draw a tokens
 * Override this method in subclass to customize token drawing
 * @param {Token} token - token model data
 * @param {Dictionary} size - width and height of token
*/
View.prototype.drawToken = function(token, size) {

  console.log("Using default drawToken()");

  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  tokenView.drawRect(size.width/2, size.height/2, size.width/2 - 20);
  return tokenView;

};

/**
 * Get the tile view that a token is on
 * @param {Token} token - A game token
 * @returns {PIXI.Graphics} tileView
*/
View.prototype.getTileViewForToken = function(token) {
  var position = this.game.board.getTilePosition(token.tile);
  var tileView = null;
  if (this.game.board instanceof ArrayBoard) {
    tileView = this.tileViews[position];
  } else if (this.game.board instanceof GridBoard) {
    tileView = this.tileViews[position.x][position.y];
  }
  return tileView;
};

/**
 * Draw all the tokens on the board
 * @returns {void}
*/
View.prototype.drawTokens = function() {

  for (var playerIdx in this.game.players) { 
    var player = this.game.players[playerIdx];
    for (var tokenIdx in player.tokens) {

      var token = player.tokens[tokenIdx];
      var tileView = this.getTileViewForToken(token);
      
      // overridden by user, probably
      var tokenView = this.drawToken(token, tileView);
      
      if (this.game.moveType == c.moveTypeManual || this.game.moveType == c.moveTypePlaceToken) { 
        tokenView.interactive = true;
        var context = this;
        tokenView.click = function(mouseData) { 
          var selectedToken;
          for (var i = 0; i < context.tokenViews.length; i++) {
            if (context.tokenViews[i].view == this) { 
              selectedToken = context.tokenViews[i].token;
            }
          }
          context.game.tokenClicked(selectedToken);
        };
      }
      
      tileView.addChild(tokenView);
      this.tokenViews.push({view: tokenView, token: token});
    }
  }
};

/**
 * Update the token view if the token moved
 * @param {Dictionary} tokenView
 * @returns {void}
*/
View.prototype.updateTokenView = function(tokenView) {
  
  // if it's dead, destroy and return
  if (tokenView.token.isDead) {
    this.destroyTokenView(tokenView);
    return;
  } 
  
  // update if we've moved
  var tileView = this.getTileViewForToken(tokenView.token);

  // make ourself a child of new tile
  tokenView.view.removeChild(tileView.view);
  tileView.addChild(tokenView.view);
};

/**
 * Update all of the tokens on the board
*/
View.prototype.updateTokens = function() {
  if (this.game.moveType == c.moveTypePlaceToken) {
    this.drawTokens();
  }

  var tokenView;
  for (var tokenViewIdx in this.tokenViews) { 
    tokenView = this.tokenViews[tokenViewIdx];
    this.updateTokenView(tokenView);
  } 
};
  
/**
 * Remove a token view from the view
 * @param {Token} token - the token to be destroyed
*/
View.prototype.destroyTokenViewForToken = function(token) { 

  var tokenView;
  for (var tokenViewIdx in this.tokenViews) { 
    tokenView = this.tokenViews[tokenViewIdx];
    if (tokenView.token == token) {
      tokenView.view.parent.removeChild(tokenView.view);
      tokenView.view.destroy();
      this.tokenViews.splice(tokenViewIdx, 1);
      return;
    }
  } 
};

/**
 * Remove the token view from the view
 * @param {Dictionary} tokenView
*/
View.prototype.destroyTokenView = function(tokenView) { 
  
  tokenView.view.parent.removeChild(tokenView.view);
  tokenView.view.destroy();
  
  var tv;
  for (var tokenViewIdx in this.tokenViews) { 
    tv = this.tokenViews[tokenViewIdx];
    if (tv == tokenView) { 
      this.tokenViews.splice(tokenViewIdx, 1);
      return;
    }
  } 
};

View.prototype.drawMessage = function() {
};

View.prototype.animate = function() {
  this.updateTokens();
  requestAnimationFrame(this.animate.bind(this));
  this.renderer.render(this.stage);
};


module.exports = View;