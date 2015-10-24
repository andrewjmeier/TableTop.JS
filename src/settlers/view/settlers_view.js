var constants = require("./view_constants.js");
var gameConstants = require("../game_constants");
var DesertTile = require("../desert_tile");
var WoodTile = require("../wood_tile");
var BrickTile = require("../brick_tile");
var WheatTile = require("../wheat_tile");
var OreTile = require("../ore_tile");
var SettlementToken = require("../settlement_token");

function SettlersView(game_state) {
    this.game = game_state;
    this.tiles = [];

    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0xF4A460});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
};

SettlersView.prototype.getHexagonTexture = function(cX, cY, size, color) {

    color = color || 0xAA00AA;

    // Draw hexagon
    g = new PIXI.Graphics();
    g.beginFill(color);
    g.lineStyle(1, 0, 1);
    g.x = cX;
    g.y = cY;
    g.drawPolygon(constants.hexagonPoints[0][0] * size, constants.hexagonPoints[0][1] * size,
                constants.hexagonPoints[1][0] * size, constants.hexagonPoints[1][1] * size,
                constants.hexagonPoints[2][0] * size, constants.hexagonPoints[2][1] * size,
                constants.hexagonPoints[3][0] * size, constants.hexagonPoints[3][1] * size,
                constants.hexagonPoints[4][0] * size, constants.hexagonPoints[4][1] * size,
                constants.hexagonPoints[5][0] * size, constants.hexagonPoints[5][1] * size);

    return g;
};

SettlersView.prototype.drawTileNumber = function(number) {
    number = number || "";

    var color = number === 6 || number === 8 ? 'white' : 'black';

    var font = {
        font: '30px Arial',
        align : 'center',
        wordWrap : true,
        strokeThickness : 1,
        fill : color,
        wordWrapWidth : 200
    };

    var text = new PIXI.Text(number, font);
    text.anchor.x = .5;
    text.anchor.y = .5;

    return text;
}

SettlersView.prototype.drawBoard = function() {
    // Draw Board and add to stage

    var board = this.getHexagonTexture(constants.boardWidth / 2 - 5, constants.boardHeight / 2 + 35, 5, 0x1099bb);
    board.rotation = Math.PI / 6;
    this.stage.addChild(board);


    var hexagonHeight = 2 * (Math.sqrt(Math.pow(constants.hexagonRadius,  2) - Math.pow((constants.hexagonRadius / 2), 2)));

    var startingYPos = 300;
    var x_pos = 150;
    var y_pos = startingYPos;


    for (var i = 0; i < 3; i++) {
        var tile = this.game.board.spaces[i];
        var hex = this.getHexagonTexture(x_pos, y_pos, 1, this.colorForType(tile));
        var num = this.drawTileNumber(tile.number);
        hex.addChild(num);
        this.stage.addChild(hex);
        this.tiles.push(hex);
        y_pos += hexagonHeight;
    }
    x_pos += 120;

    y_pos = startingYPos - (hexagonHeight / 2);
    for (i = 3; i < 7; i++) {
        var tile = this.game.board.spaces[i];
        var hex = this.getHexagonTexture(x_pos, y_pos, 1, this.colorForType(tile));
        var num = this.drawTileNumber(tile.number);
        hex.addChild(num);
        this.stage.addChild(hex);
        this.tiles.push(hex);
        y_pos += hexagonHeight;
    }
    x_pos += 120;

    y_pos = startingYPos - hexagonHeight;
    for (i = 7; i < 12; i++) {
        var tile = this.game.board.spaces[i];
        var hex = this.getHexagonTexture(x_pos, y_pos, 1, this.colorForType(tile));
        var num = this.drawTileNumber(tile.number);
        hex.addChild(num);
        this.stage.addChild(hex);
        this.tiles.push(hex);
        y_pos += hexagonHeight;
    }
    x_pos += 120;

    y_pos = startingYPos - (hexagonHeight / 2);
    for (i = 12; i < 16; i++) {
        var tile = this.game.board.spaces[i];
        var hex = this.getHexagonTexture(x_pos, y_pos, 1, this.colorForType(tile));
        var num = this.drawTileNumber(tile.number);
        hex.addChild(num);
        this.stage.addChild(hex);
        this.tiles.push(hex);
        y_pos += hexagonHeight;
    }
    x_pos += 120;

    y_pos = startingYPos;
    for (i = 16; i < 19; i++) {
        var tile = this.game.board.spaces[i];
        var hex = this.getHexagonTexture(x_pos, y_pos, 1, this.colorForType(tile));
        var num = this.drawTileNumber(tile.number);
        hex.addChild(num);
        this.stage.addChild(hex);
        this.tiles.push(hex);
        y_pos += hexagonHeight;
    }

    // run the render loop
    this.animate();
};

SettlersView.prototype.colorForType = function(tile) {
    if (tile instanceof DesertTile) {
        return 0xC08E37;
    } else if (tile instanceof WoodTile) {
        return 0x007827;
    } else if (tile instanceof BrickTile) {
        return 0xD85C38;
    } else if (tile instanceof WheatTile) {
        return 0xFAB600;
    } else if (tile instanceof OreTile) {
        return 0xA8BEB7;
    } else {
        return 0x00E700;
    }
};

SettlersView.prototype.drawDice = function() {
    var text = this.game.dice[0] + ", " + this.game.dice[1];
    if (this.diceView) {
        this.diceView.text = text;
    } else {
        var font = {
            font: '30px Arial',
            align : 'center',
            wordWrap : true,
            strokeThickness : 1,
            fill : 'black',
            wordWrapWidth : 200
        };
        this.diceView = new PIXI.Text(text, font);
        this.diceView.x = 1000;
        this.diceView.y = 300;
        this.stage.addChild(this.diceView);
    }
};

SettlersView.prototype.drawSettlements = function() {
    for (var i in this.game.players) {
        var player = this.game.players[i];
        for (var j in player.tokens) {
            var token = player.tokens[j];
            if (token instanceof SettlementToken) {
                this.drawSettlement(token);
            }
        }
    }
};

SettlersView.prototype.drawSettlement = function(token) {

};

SettlersView.prototype.animate = function() {
    this.drawDice();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
};

module.exports = SettlersView;


