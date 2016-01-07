var c = require("./ttConstants.js");
var GridBoard = require("./gridBoard.js");
var PIXI = require("../../lib/pixi/pixi.js");

function View(game, turnMap) {
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

View.prototype.drawBoard = function() { 
  if (this.game.board instanceof GridBoard) 
    this.drawGridBoard();
  
  /* todo: 

   else if (this.game.board instanceof PathBoard) 
     this.drawPathBoard();
   else if (this.game.board instanceof GraphBoard)
     this.drawGraphBoard();
   else 
     do nothing and defer drawing to user? 

   */
};

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

// todo 
View.prototype.drawPathBoard = function() {

};

// todo 
View.prototype.drawGraphBoard = function() {

};

View.prototype.drawTile = function(tile, size) { 

  console.log("Using default drawTile()");
  var tileView = new PIXI.Graphics();
  tileView.lineStyle(1, 0, 1);
  tileView.beginFill(tile.color, 1);
  tileView.drawRect(0, 0, size.width, size.height);

};

View.prototype.drawTiles = function() {

  var tileWidth = c.boardWidth / this.game.board.spaces[0].length;
  var tileHeight = c.boardHeight / this.game.board.spaces.length;
  var y_pos = c.boardHeight;
  var x_pos = 0;
  
  for (var y = 0; y < this.game.board.spaces.length; y++) {
    x_pos = 0;
    y_pos -= tileHeight;
    for (var x = 0; x < this.game.board.spaces[0].length; x++) {

      var tile = this.game.board.getSpace(x, y);
      var tileView = this.drawTile(tile, {width: tileWidth, height:tileHeight});
      tileView.x = x_pos;
      tileView.y = y_pos;
      
      if (this.game.moveType == c.moveTypeManual) { 
        tileView.interactive = true;
        var context = this;
        tileView.click = function(mouseData) {
          var selectedSpace;
          for (var i = 0; i < context.tileViews.length; i++) {
            for (var j = 0; j < context.tileViews[0].length; j++) { 
              if (context.tileViews[i][j] == this) { 
                selectedSpace = context.game.board.getSpace(i, j);
              }
            }
          }
          
          context.game.spaceClicked(selectedSpace);
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
View.prototype.drawToken = function(token, size) {

  console.log("Using default drawToken()");

  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  tokenView.drawRect(size.width/2, size.height/2, size.width/2 - 20);
  return tokenView;

};

View.prototype.drawTokens = function() {

  for (var playerIdx in this.game.players) { 
    var player = this.game.players[playerIdx];
    for (var tokenIdx in player.tokens) {

      var token = player.tokens[tokenIdx];
      var position = this.game.board.getSpacePosition(token.space);
      var tileView = this.tileViews[position.x][position.y];
      
      // overridden by user, probably
      var tokenView = this.drawToken(token, tileView);
      
      if (this.game.moveType == c.moveTypeManual) { 
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

View.prototype.updateTokenView = function(tokenView) {
  
  // if it's dead, destroy and return
  if (tokenView.token.isDead) {
    this.destroyTokenView(tokenView);
    return;
  } 
  
  // update if we've moved
  var position = this.game.board.getSpacePosition(tokenView.token.space);
  var tileView = this.tileViews[position.x][position.y];

  // make ourself a child of new tile
  tokenView.view.removeChild(tileView.view);
  tileView.addChild(tokenView.view);
};

View.prototype.updateTokens = function() {
  var tokenView;
  for (var tokenViewIdx in this.tokenViews) { 
    tokenView = this.tokenViews[tokenViewIdx];
    this.updateTokenView(tokenView);
  } 
};
  
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

