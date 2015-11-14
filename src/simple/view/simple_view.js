var constants = {
    canvasWidth : 1000,
    canvasHeight : 200,
    numberOfSpaces : 20,
    colors : [
        0x6F3A19,
        0x88C8F3
    ]
};

function SimpleView(game_state) {
    this.game = game_state;
    this.tileViews = [];
    this.tokenViews = [];

    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0x1099bb});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
};

SimpleView.prototype.drawBoard = function() {
    x_pos = 0;
    y_pos = 0;
    for (i = 0; i < this.game.board.spaces.length; i++) {
        tile = new PIXI.Graphics();
        tile.lineStyle(1, 0, 1);
        tile.drawRect(x_pos, y_pos, constants.canvasWidth / this.game.board.spaces.length, constants.canvasHeight);
        x_pos += constants.canvasWidth / this.game.board.spaces.length;

        this.tileViews.push(tile);
        this.stage.addChild(tile);

    }

    this.drawTokens();

    this.drawMessage();
    this.animate();
};

SimpleView.prototype.drawToken = function(position, index, color) {
    var token = new PIXI.Graphics();
    token.lineStyle(1, 0, 1);
    token.beginFill(color, 1);
    var tile = this.tileViews[position];
    token.drawRect(5, 50 * (index + 1), 20, 20);
    tile.addChild(token);
    this.tokenViews.push({token: token, tile: tile});
}

SimpleView.prototype.drawTokens = function() {
    for (i = 0; i < this.game.players.length; i++) {
        this.drawToken(this.game.players[i].position, i, constants.colors[i]);
    }
};

SimpleView.prototype.updateToken = function(position, index, color) {
    var playerView = this.tokenViews[index];
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
}

SimpleView.prototype.updateTokens = function() {
    for (i = 0; i < this.game.players.length; i++) {
        this.updateToken(this.game.players[i].position, i, constants.colors[i]);
    }
}

SimpleView.prototype.drawMessage = function() {
    var container = new PIXI.Container();

    button1 = new PIXI.Graphics();
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
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : 150,
                                                });
    this.button1Text.x = 50;
    button1.addChild(this.button1Text);
    this.stage.addChild(container);
};

SimpleView.prototype.animate = function() {
    this.updateTokens();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
}


module.exports = SimpleView;


