var PIXI = require("../../../lib/pixi/pixi.js")

var constants = require("./view_constants.js");
var gameConstants = require("../game_constants");
var DesertTile = require("../desert_tile");
var WoodTile = require("../wood_tile");
var BrickTile = require("../brick_tile");
var WheatTile = require("../wheat_tile");
var OreTile = require("../ore_tile");
var SettlementToken = require("../settlement_token");
var SettlersVertexLeftTile = require("../board/settlers_vertex_left_tile");
var SettlersVertexRightTile = require("../board/settlers_vertex_right_tile");
var Road = require("../road_token");

function SettlersView(game_state, turnMap) {
    this.game = game_state;
    this.turnMap = turnMap;
    this.tiles = [];

    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0xF4A460});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();

    this.drawGraph();
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
};

SettlersView.prototype.drawVertex = function(v, x, y) {
    var color = 0x000000;
    if (v.settlement) {
        color = constants.playerColors[v.settlement.player.color];
    }
    var vertex = new PIXI.Graphics();

    vertex.interactive = true;
    var context = this;
    vertex.click = function(mouseData){
       console.log("CLICK!");
       this.game.createSettlement(v);
       this.turnMap.updateState("yes");
    }.bind(this);

    vertex.beginFill(color);
    vertex.drawRect(0, 0, 10, 10);
    vertex.x = x;
    vertex.y = y;
    this.stage.addChild(vertex);
};

SettlersView.prototype.drawRoad = function(color, x1, y1, x2, y2) {
    var road = new PIXI.Graphics();
    var color = constants.playerColors[color];
    road.lineStyle(4, color);
    road.moveTo(x1, y1);
    road.lineTo(x2, y2);

    this.stage.addChild(road);
};

SettlersView.prototype.drawGraph = function() {
    this.drawnVerticies = [];
    var vertex = this.game.board.graph["1"];
    var v_x = 105;
    var v_y = 225;

    var verticiesToDraw = [];
    verticiesToDraw.push({vertex: vertex, point: [v_x, v_y]});

    // make queue of verticies to draw
    while (verticiesToDraw.length) {
        var data = verticiesToDraw.pop();
        vertex = data.vertex;
        var x = data.point[0];
        var y = data.point[1];
        this.drawVertex(vertex, x, y);
        this.drawnVerticies.push(vertex);
        if (vertex instanceof SettlersVertexLeftTile) {
            this.addLeftVertexType(verticiesToDraw, vertex, x, y, this.drawnVerticies);
        } else {
            this.addRightVertexType(verticiesToDraw, vertex, x, y, this.drawnVerticies);
        }
    }
};

SettlersView.prototype.addLeftVertexType = function(verticiesToDraw, vertex, x, y, drawnVerticies) {
    if (vertex.edges[0]) {
        var left_x = x - 80;
        var left_y = y;
        var edge = vertex.edges[0];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, left_x, left_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [left_x, left_y]});
        }
    }

    if (vertex.edges[1]) {
        var up_x = x + 40;
        var up_y = y - 70;
        var edge = vertex.edges[1];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, up_x, up_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [up_x, up_y]});
        }
    }

    if (vertex.edges[2]) {
        var down_x = x + 40;
        var down_y = y + 70;
        var edge = vertex.edges[2];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, down_x, down_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [down_x, down_y]});
        }
    }
};

SettlersView.prototype.addRightVertexType = function(verticiesToDraw, vertex, x, y, drawnVerticies) {
    if (vertex.edges[0]) {
        var up_x = x - 40;
        var up_y = y - 70;
        var edge = vertex.edges[0];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, up_x, up_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [up_x, up_y]});
        }
    }

    if (vertex.edges[1]) {
        var right_x = x + 80;
        var right_y = y;
        var edge = vertex.edges[1];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, right_x, right_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [right_x, right_y]});
        }
    }

    if (vertex.edges[2]) {
        var down_x = x - 40;
        var down_y = y + 70;
        var edge = vertex.edges[2];
        if (edge.road) {
            var road = edge.road;
            this.drawRoad(road.player.color, x, y, down_x, down_y);
        }
        var newVertex = edge.startVertex === vertex ? edge.endVertex : edge.startVertex;
        var index = drawnVerticies.indexOf(newVertex);
        if (index === -1) {
            verticiesToDraw.push({vertex: newVertex, point: [down_x, down_y]});
        }
    }
};

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

    this.drawAllPlayersInfo();
    this.drawMessage();
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

SettlersView.prototype.drawPlayerInfo = function(player) {
    var info = new PIXI.Text(player.name + "\nDBA: $" + player.money, {font: '20px Arial',
                                                align : 'left',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : constants.canvasWidth - constants.boardWidth - (4 * constants.leftBuffer),
                                                });
    return info;
}

SettlersView.prototype.drawAllPlayersInfo = function() {
    var infoBlock = new PIXI.Graphics();
    infoBlock.x = constants.boardWidth + constants.leftBuffer * 2;
    infoBlock.y = constants.upperBuffer;
    var blockSize = 150;
    this.playerInfos = [];
    for (var i in this.game.players) {
        var player = this.game.players[i];
        var info = this.drawPlayerInfo(player);
        info.x = constants.leftBuffer * 0.2;
        info.y = i * blockSize + (constants.upperBuffer * 0.2);

        var playerColor = new PIXI.Graphics();
        playerColor.x = constants.leftBuffer * 3;
        playerColor.y = i * blockSize + (constants.upperBuffer * 0.2);
        playerColor.beginFill(constants.playerColors[player.color]);
        playerColor.drawRect(0, 0, 20, 20);

        var box = new PIXI.Graphics();
        box.y = i * blockSize;

        var outline = new PIXI.Graphics();
        outline.y = i * blockSize;
        outline.lineStyle(1, 0, 1);
        outline.drawRect(0, 0, constants.canvasWidth - constants.boardWidth - (3 * constants.leftBuffer), 140);

        box.lineStyle(1, 0, 1);
        box.beginFill(0x44C0DF, 1);
        box.drawRect(0, 0, constants.canvasWidth - constants.boardWidth - (3 * constants.leftBuffer), 140);
        this.playerInfos.push({background: box, text: info});

        infoBlock.addChild(outline);
        infoBlock.addChild(box);
        infoBlock.addChild(info);
        infoBlock.addChild(playerColor);


    }
    this.stage.addChild(infoBlock);
};

SettlersView.prototype.updatePlayerInfo = function(player, index) {
    var info = this.playerInfos[index].text;
    var box = this.playerInfos[index].background;

    if (player === this.game.getCurrentPlayer()) {
        box.alpha = 1;
    } else {
        box.alpha = 0;
    }
    var cards = "";
    var resourceNames = {
        0: "Wood",
        1: "Brick",
        2: "Sheep",
        3: "Wheat",
        4: "Ore"
    };
    for (var key in player.cards) {
        cards += resourceNames[key] + ": " + player.cards[key] + ", ";
    }
    info.text = player.name + "\n" + cards + "\nSettlements Remaining: " + player.settlementsRemaining + "\nCities Remaining: " + player.citiesRemaining + "\nRoads Remaining: " + player.roadsRemaining;
};

SettlersView.prototype.updateAllPlayersInfo = function() {
    for (var i in this.game.players) {
        var player = this.game.players[i];
        this.updatePlayerInfo(player, i);
    }
}

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
        this.diceView.y = 600;
        this.stage.addChild(this.diceView);
    }
};

SettlersView.prototype.drawRobber = function() {
    if (!this.robber) {
        var texture = PIXI.Texture.fromImage('assets/settlers/robber.png');
        this.robber = new PIXI.Sprite(texture);
        this.robber.width = 20;
        this.robber.height = 50;
    } else {
        if (this.robberTile) {
            this.robberTile.removeChild(this.robber);
        }
    }
    for (var i in this.tiles) {
        var tile = this.tiles[i];
        var gameTile = this.game.board.spaces[i];
        if (gameTile.hasRobber) {
            tile.addChild(this.robber);
            this.robberTile = tile;
        }
    }
};

SettlersView.prototype.drawMessage = function() {
    var container = new PIXI.Container();
    this.messageText = new PIXI.Text("Welcome to settlers", {font: '30px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : constants.canvasWidth - (2 * constants.leftBuffer),
                                                });
    container.x = constants.leftBuffer;
    container.y = constants.boardHeight + (2 * constants.upperBuffer);
    container.addChild(this.messageText);

    button1 = new PIXI.Graphics();
    button1.y = 180;
    button1.beginFill(0x00FF00, 1);
    button1.drawRect(0, 0, 200, 50);
    container.addChild(button1);

    button1.interactive = true;
    var context = this;
    button1.click = function(mouseData){
       this.turnMap.updateState("yes");
    }.bind(this);

    this.button1Text = new PIXI.Text("Yes", {font: '30px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : 150,
                                                });
    this.button1Text.x = 50;
    button1.addChild(this.button1Text);

    this.button2 = new PIXI.Graphics();
    this.button2.x = 250;
    this.button2.y = 180;
    this.button2.beginFill(0xFF0000, 1);
    this.button2.drawRect(0, 0, 200, 50);
    container.addChild(this.button2);

    this.button2.interactive = true;
    this.button2.click = function(mouseData) {
        this.turnMap.updateState("no");
    }.bind(this);

    this.button2Text = new PIXI.Text("No", {font: '30px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : 150,
                                                });
    this.button2Text.x = 50;
    this.button2.addChild(this.button2Text);

    this.stage.addChild(container);
};

SettlersView.prototype.updateMessage = function() {
    this.messageText.text = this.game.message;

    switch (this.turnMap.getCurrentState()) {

      // case BUY_PROMPT:

      //   this.button1Text.text = "Yes";
      //   this.button2Text.text = "No";
      //   this.button2.alpha = 1;
      //   break;

      default:
        this.button1Text.text = "Continue";
        this.button2Text.text = "";
        this.button2.alpha = 0;
        break;
    }
};

SettlersView.prototype.animate = function() {
    this.drawDice();
    this.drawRobber();
    this.drawGraph();
    this.updateMessage();
    this.updateAllPlayersInfo();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
};

module.exports = SettlersView;


