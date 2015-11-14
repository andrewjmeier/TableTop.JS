var constants = {
  canvasWidth : 1000,
  canvasHeight : 200
};

function View(game_state, board_type) {
  this.game = game_state;
  this.tileViews = [];
  this.tokenViews = [];
  
  this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
                                          {backgroundColor : 0x1099bb});
  
  document.body.appendChild(this.renderer.view);

  // create the root of the scene graph
  this.stage = new PIXI.Container();
};

View.prototype.drawGridBoard = function() {
  var y_pos = 0;
  var x_pos = 0;
  if (!this.board.spaces[0]) return;
  for (var x = 0; x < this.board.spaces[0].length; x++) {
    x_pos = 0;
    for (var y = 0; y < this.board.spaces.length; y++) {
      var tileView = new PIXI.Graphics();
      var tile = this.board.spaces[x, y];
      tileView.lineStyle(1, 0, 1);
      tileView.drawRect(x_pos, y_pos, constants.canvasWidth / this.game.board.spaces.length, constants.canvasHeight);
      x_pos += constants.canvasWidth / this.game.board.spaces.length;
      tileView.beginFill(tile.color, 1);
      this.tileViews.push(tileView);
      this.stage.addChild(tileView);
    }
  }
  
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


View.prototype.drawToken = function(token) {

  // draw the token 
  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  
  // put it on the tile
  var tile = this.tileViews[token.pos.x, token.pos.y];
  // todo: shape of token 
  tokenView.drawRect(10, 10, 20, 20);
  tile.addChild(tokenView);
  this.tokenViews.push({token: tokenView, tile: tile});
};

View.prototype.drawTokens = function() {
  for (var playerIdx in this.game.players) { 
    var player = this.game.players[playerIdx];
    for (var tokenIdx in player.tokens) {
      var token = player.tokens[tokenIdx];
      if (!token.isDead) {
        this.updateToken(token.pos);
      }
    }
  }
};

View.prototype.updateToken = function(token) {
  var tokenView = 
  var token = playerView.token;

  // remove the token from the previous tile
  var previousTile = playerView.tile;
  previousTile.removeChild(token);

  // add the token as a child to the new tile
  var currentTile = this.tileViews[position];
  currentTile.addChild(token);
  this.tokenViews[index] = {token: token, tile: currentTile};

  // calculate an offset for the token if there are multiple
  token.x = ((constants.canvasWidth / this.game.board.spaces.length) * position);
};

View.prototype.updateTokens = function() {
  for (var playerIdx in this.game.players) { 
    var player = this.game.players[playerIdx];
    for (var tokenIdx in player.tokens) {
      var token = player.tokens[tokenIdx];
      if (!token.isDead) {
        this.updateToken(token.pos);
      }
    }
  }
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


