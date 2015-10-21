var HousingProperty = require("../board/properties/housingProperty.js");
var RailroadProperty = require("../board/properties/railroadProperty.js");
var UtilityProperty = require("../board/properties/utilityProperty.js");
var constants = require("./view_constants.js");

function MonopolyView(game_state) {
    this.game = game_state;
    this.tiles = []

    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0x1099bb});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();
};

MonopolyView.prototype.drawBoard = function() {
    // Draw Board and add to stage

    var board = new PIXI.Graphics();
    //board.lineStyle(1, 0x000000, 1);
    board.beginFill(0xC2E2BF, 1);
    board.drawRect(constants.boardStartX, constants.boardStartY, constants.boardWidth, constants.boardHeight);
    this.stage.addChild(board);

    // Initialize variables for drawing tiles
    var x_pos = constants.leftBuffer;
    var y_pos = constants.boardHeight + constants.upperBuffer - constants.tileLongSide;
    var x_inc = 0;
    var y_inc = 0;
    var rotation_degrees = 0;
    var property_index = 0;

    // Draw Tiles
    for (i = 0; i < this.game.board.spaces.length; i++) {
        // Draw Go
        if (i == 0) {
            go = this.drawGo(x_pos, y_pos);
            this.tiles.push(go);
            this.stage.addChild(go);

            x_correction = 1;
            y_correction = 0;
            x_inc = 0;
            y_inc = -constants.tileShortSide;
            rotation = Math.PI / 2;
        }

        // Draw Jail
        else if (i == 10) {
            y_pos -= constants.tileLongSide;
            jail = new PIXI.Graphics();
            jail.x = x_pos;
            jail.y = y_pos;
            jail.lineStyle(1, 0, 1);
            jail.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);
            this.tiles.push(jail);
            this.stage.addChild(jail);

            x_correction = 1;
            y_correction = 1;
            x_pos += constants.tileLongSide;
            x_inc = constants.tileShortSide;
            y_inc = 0;
            rotation = Math.PI;
        }

        // Draw Free Parking
        else if (i == 20) {
            var free_parking = new PIXI.Graphics();
            free_parking.x = x_pos;
            free_parking.y = y_pos;
            free_parking.lineStyle(1, 0, 1);
            free_parking.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);
            this.tiles.push(free_parking);
            this.stage.addChild(free_parking);

            x_correction = 0;
            y_correction = 1;
            y_pos += constants.tileLongSide;
            x_pos += constants.tileLongSide;
            x_inc = 0;
            y_inc = constants.tileShortSide;
            rotation = 3 * Math.PI / 2;
        }

        // Draw Go to Jail
        else if (i == 30) {
            x_pos -= constants.tileLongSide;
            var go_jail = new PIXI.Graphics();
            go_jail.position.set(x_pos, y_pos);
            go_jail.lineStyle(1, 0, 1);
            go_jail.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);
            this.tiles.push(go_jail);
            this.stage.addChild(go_jail);

            x_correction = 0;
            y_correction = 0;
            y_pos += constants.tileLongSide;
            x_inc = -constants.tileShortSide;
            y_inc = 0;
            rotation = 0;
        }

        // Else Draw Tile
        else {
            var property = this.drawTile(x_pos + x_correction, y_pos + y_correction, this.game.board.spaces[i]);
            property.rotation = rotation;
            this.tiles.push(property);
            this.stage.addChild(property);

            x_pos += x_inc;
            y_pos += y_inc;
        }
    }
    
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage('assets/Big_D.png');
    var texture2 = PIXI.Texture.fromImage('assets/jail.png');
    var texture3 = PIXI.Texture.fromImage('assets/chance.jpg');
    var texture4 = PIXI.Texture.fromImage('assets/patch.jpg');

    // create a new Sprite using the texture
    var jail = new PIXI.Sprite(texture2);
    var chance_image = new PIXI.Sprite(texture3);
    var chance_image2 = new PIXI.Sprite(texture3);
    var chance_image3 = new PIXI.Sprite(texture3);
    var Hpo = new PIXI.Sprite(texture4);


    Hpo.interactive = true;
    Hpo.click = function(mouseData){
       console.log("CLICK!");
    };

    // rescale and place jail
    jail.scale.x = 0.265;
    jail.scale.y = 0.21;
    jail.position.x = 0;
    jail.position.y = 677;

    // rescale and place jail
    chance_image.scale.x = 0.428;
    chance_image.scale.y = 0.487;
    chance_image.position.x = 193.75; chance_image.position.y = 0;

    // rescale and place jail
    chance_image2.scale.x = 0.428;
    chance_image2.scale.y = 0.487;
    chance_image2.position.x = 262.5;
    chance_image2.position.y = 675;

    // rescale and place jail
    chance_image3.scale.x = 0.428;
    chance_image3.scale.y = 0.487;
    chance_image3.rotation = -1.5708;
    chance_image3.position.x = 675;
    chance_image3.position.y = 468.75;

    // rescale and place jail
    Hpo.scale.x = 0.553;
    Hpo.scale.y = 0.442;
    Hpo.position.x = 676;
    Hpo.position.y = 1;

    // fill bottom left box white (jail)
    this.graphics.beginFill(0xFFFFFF, 1);
    this.graphics.drawRect(0, 675, 125, 125);
    var jail_text = new PIXI.Text('IN JAIL');
    jail_text.scale.x = 1.1;
    jail_text.scale.y = 1.1;
    jail_text.x = 15;
    jail_text.y = 767;

     // set a fill and a line style again and draw a rectangle
    this.graphics.lineStyle(1, 0x000000, 1);
    this.graphics.beginFill(0xC2E2BF, 1);

    // draw center & corner rectangles
    this.graphics.drawRect(0, 0, 125, 125);
    this.graphics.drawRect(675, 0, 125, 125);
    this.graphics.drawRect(125, 125, 550, 550);
    this.graphics.drawRect(675, 675, 125, 125);

    // draw community chest + chances box
    this.graphics.drawRect(135, 135, 200, 120);
    this.graphics.drawRect(465, 545, 200, 120);

    this.graphics.beginFill(0xFFFFFF, 1);
    this.graphics.drawRect(100, 100, 300, 100);

    // write "community chest" & "chance"
    var chance = new PIXI.Text('CHANCE');
    chance.scale.x = 1.5;
    chance.scale.y = 1.5;
    chance.x = 479;
    chance.y = 585;

    var community = new PIXI.Text('COMMUNITY');
    var chest = new PIXI.Text('CHEST');
    community.scale.x = 1.1;
    community.scale.y = 1.1;
    community.x = 145;
    community.y = 160;
    chest.scale.x = 1.1;
    chest.scale.y = 1.1;
    chest.x = 185;
    chest.y = 200;

    // rescale and place logo
    var logo = new PIXI.Sprite(texture);

    logo.width = constants.logoSizeX;
    logo.height = constants.logoSizeY;

    logo.position.x = constants.logoPosX;
    logo.position.y = constants.logoPosY;

    logo.anchor.x = .5;
    logo.anchor.y = .5;
    logo.rotation = constants.logoRotation;
    this.stage.addChild(logo);

    this.stage.addChild(this.drawChanceCard(this.game.communityChestCards.drawCard()));
    this.drawPlayers();
    // run the render loop
    this.animate();
}

MonopolyView.prototype.drawChanceCard = function(chanceCard) {
    var width = constants.boardWidth / 2;
    var height = width * 0.6;
    var xPos = (constants.boardWidth / 4) + constants.leftBuffer;
    var yPos = constants.boardHeight / 2 + constants.upperBuffer - (height / 2);

    var font = {
        font: '30px cursive',
        align : 'center',
        wordWrap : true,
        strokeThickness : 1,
        wordWrapWidth : (width - 10)
    };
    chanceText = new PIXI.Text("Chance", font);
    chanceText.x = 30
    chanceText.y = 30
    return this.drawCard(xPos, yPos, width, height, chanceCard.text, 0xE68900, chanceText);
}

MonopolyView.prototype.drawCommunityChestCard = function(chanceCard) {
    var width = constants.boardWidth / 2;
    var height = width * 0.6;
    var xPos = (constants.boardWidth / 4) + constants.leftBuffer;
    var yPos = constants.boardHeight / 2 + constants.upperBuffer - (height / 2);

    var font = {
        font: '30px cursive',
        align : 'center',
        wordWrap : true,
        strokeThickness : 1,
        wordWrapWidth : (width - 10)
    };
    chanceText = new PIXI.Text("Community Chest", font);
    chanceText.x = 30
    chanceText.y = 30
    return this.drawCard(xPos, yPos, width, height, chanceCard.text, 0xFFFF66, chanceText);
}

MonopolyView.prototype.drawCard = function(xPos, yPos, width, height, text, color, title) {
    var card = new PIXI.Graphics();
    card.x = xPos;
    card.y = yPos;
    card.lineStyle(1, 0, 1);

    card.beginFill(color, 1);
    card.drawRect(0, 0, width, height);

    card.addChild(title);


    var cardText = new PIXI.Text(text, {font: '25px Arial',
                                        align : 'center',
                                        wordWrap : true,
                                        strokeThickness : 1,
                                        //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                        wordWrapWidth : (width - 40),
                                        });
    cardText.x = 20
    cardText.y = 85
    card.addChild(cardText);

    return card;
}

MonopolyView.prototype.drawTile = function(x_pos, y_pos, tile) {
    if (tile instanceof HousingProperty) {
        property = this.drawProperty(x_pos, y_pos, tile);
    }

    else {
        property = new PIXI.Graphics();
        property.lineStyle(1, 0, 1);
        property.x = x_pos;
        property.y = y_pos;
        property.pivot.set(constants.tileShortSide, constants.tileLongSide);
        property.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);
    } 

    return property;
}

MonopolyView.prototype.drawProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    tile.beginFill(constants.propertyColors[property.propertyGroup], 1);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileColorLength);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.x = constants.tileShortSide / 2;
        name.y = constants.tileColorLength + constants.textPadding;
        name.anchor.set(.5, 0);
        tile.addChild(name);
    }

    if (property.cost) {
        var price = new PIXI.Text('$' + property.cost, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        price.x =  constants.tileShortSide / 2;
        price.y =  constants.tileLongSide - constants.textPadding;
        price.anchor.set(.5, 1);
        tile.addChild(price);
    }
    return tile;
}

MonopolyView.prototype.drawGo = function(x_pos, y_pos) {
    var go = new PIXI.Graphics();
    go.x = x_pos;
    go.y = y_pos;
    go.lineStyle(1, 0, 1);
    go.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);

    arrow = this.drawArrow(constants.goArrowXOffset, constants.goArrowYOffset,
            constants.goArrowXLength, constants.goArrowYLength, constants.goArrowColor);
    arrow.rotation = Math.PI / 2;
    go.addChild(arrow);

    go_text = new PIXI.Text("GO", {font : "bold 60px Impact", align : "center"});
    go_text.anchor.set(.5, .5);
    go_text.position.set((constants.tileLongSide / 2), (constants.tileLongSide / 2));
    go_text.rotation = Math.PI / 4;
    go.addChild(go_text);

    return go;
}

MonopolyView.prototype.drawArrow = function(x_pos, y_pos, x_len, y_len, fill_color) {
    arrow = new PIXI.Graphics();
    arrow.x = x_pos;
    arrow.y = y_pos;
    arrow.lineStyle(1, 0, 1);
    arrow.beginFill(fill_color);
    point_divisor = 6.0;
    thickness_divisor = 4.0;

    arrow.drawPolygon(0, (y_len / 2),
            (x_len / point_divisor), 0,
            (x_len / point_divisor), (y_len / thickness_divisor),
            x_len, (y_len / thickness_divisor),
            x_len, y_len - (y_len / thickness_divisor),
            (x_len / point_divisor), y_len - (y_len / thickness_divisor),
            (x_len / point_divisor), y_len);

    return arrow;
}

MonopolyView.prototype.drawPlayerToken = function(player) {
    var token = new PIXI.Graphics();
    token.lineStyle(0, 0, 0);
    token.beginFill(player.color, 1);
    var tile = this.tiles[30];
    token.drawRect(tile.x + 5, tile.y + 5, 10, 10);

    return token;
};

MonopolyView.prototype.drawPlayers = function() {
    for (index in this.game.players) {
        this.stage.addChild(this.drawPlayerToken(this.game.players[index]));
    }
};

MonopolyView.prototype.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
}

module.exports = MonopolyView;


