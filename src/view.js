var c = require("./ttConstants.js");
var GridBoard = require("./board/gridBoard.js");

function View(game, turnMap) {
  this.game = game;
  this.turnMap = turnMap;
  this.turnMap.updateState("start");
  this.tokenViews = [];
  this.tileViews = [];
  this.boardView = new PIXI.Graphics();
  
  if (game.board instanceof GridBoard) { 
    for (var i = 0; i < this.game.board.height; i++) { 
      this.tileViews[i] = [];
    } 
  } 
    
  this.renderer = PIXI.autoDetectRenderer(c.canvasWidth, c.canvasHeight,
                                          {backgroundColor : 0x1099bb});
  document.body.appendChild(this.renderer.view);
  // create the root of the scene graph
  this.stage = new PIXI.Container();
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
 
  //board.lineStyle(1, 0x000000, 1);
  this.boardView.beginFill(0xC2E2BF, 1);
  this.boardView.drawRect(c.boardStartX, c.boardStartY, c.boardWidth, c.boardHeight);
  this.stage.addChild(this.boardView);
  
  this.drawTiles(this.boardView);
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

View.prototype.drawTile = function(tile, boardView, x_pos, y_pos, tileWidth, tileHeight) {
  var tileView = new PIXI.Graphics();
  tileView.lineStyle(1, 0, 1);
  tileView.drawRect(x_pos, y_pos, tileWidth, tileHeight);
  tileView.beginFill(tile.color, 1);
  
  if (this.game.moveType == c.moveTypeManual) { 
    tileView.interactive = true;
    var context = this;
    tileView.click = function(mouseData) { 
      if (context.turnMap.getCurrentState() == "waitingForMove" && 
          context.game.proposedMove.token) { 
        context.game.setProposedMoveDestination(tile);
        context.turnMap.updateState("makeMove");
      };
    };
  } 
  
  this.tileViews[x_pos][y_pos] = tileView;
  this.boardView.addChild(tileView);
};

View.prototype.drawTiles = function(boardView) {

  var tileWidth = c.canvasWidth / this.game.board.spaces[0].length;
  var tileHeight = c.canvasHeight / this.game.board.spaces.length;
  var y_pos = 0;
  var x_pos = c.canvasHeight;
  
  for (var x = 0; x < this.game.board.spaces[0].length; x++) {
    x_pos = 0;
    y_pos -= tileHeight;
    for (var y = 0; y < this.game.board.spaces.length; y++) {
      var tile = this.game.board.getSpace(x, y);
      this.drawTile(tile, boardView, x_pos, y_pos, tileWidth, tileHeight);
      x_pos += tile.width;
    }
  }
};

// draws token, puts it on appropriate tile,
// adds it to tokenViews
View.prototype.drawToken = function(token) {

  // draw the token 
  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  if (this.game.moveType == c.moveTypeManual) { 
    tokenView.interactive = true;
    var context = this;
    tokenView.click = function(mouseData) { 
      if (context.turnMap.getCurrentState() == "waitingForMove") { 
        context.game.setProposedMoveToken(tokenView.token);
      };
    };
  }
  
  // put it on the tile
  var tileView = this.tileViews[token.pos.x, token.pos.y];
  tokenView.drawRect(10, 10, 20, 20); // todo: other shapes
  tileView.addChild(tokenView);

  this.tokenViews.push({view: tokenView, token: token});
};

View.prototype.drawTokens = function() {
  for (var playerIdx in this.game.players) { 
    var player = this.game.players[playerIdx];
    for (var tokenIdx in player.tokens) {
      var token = player.tokens[tokenIdx];
      this.drawToken(token);
    }
  }
};

View.prototype.updateTokenView = function(tokenView) {
  var view = tokenView.view;
  var token = tokenView.token;
  
  // if it's dead, destroy and return
  if (token.isDead) {
    this.destroyTokenView(tokenView);
    return;
  } 
  
  // move the token to new tile
  var destinationTile = this.tileViews[token.position.x][token.position.y];
  destinationTile.removeChildren(); 
  tokenView.view.setParent(destinationTile);
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
      this.destoryTokenView(tokenView);
      return;
    }
  } 
};

View.prototype.destroyTokenView = function(tokenView) { 
  tokenView.view.destroy();
  this.tokenViews.remove(function(tv) { return tv == tokenView; });
};
  
View.prototype.drawMessage = function() {
  var container = new PIXI.Container();

  var button1 = new PIXI.Graphics();
  button1.y = 160;
  button1.beginFill(0x00FF00, 1);
  button1.drawRect(0, 0, 200, 40);
  container.addChild(button1);

  button1.interactive = true;
  var context = this;
  button1.click = function(mouseData){
    console.log("CLICK!");
    context.game.updateState(true);
  };

  this.button1Text = new PIXI.Text("Roll", {font: '30px Arial',
                                            align : 'center',
                                            wordWrap : true,
                                            strokeThickness : .25,
                                            wordWrapWidth : 150
                                           });
  this.button1Text.x = 50;
  button1.addChild(this.button1Text);
  this.stage.addChild(container);
};

View.prototype.animate = function() {
  this.updateTokens();
  requestAnimationFrame(this.animate.bind(this));
  this.renderer.render(this.stage);
};


module.exports = View;


