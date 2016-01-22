var PIXI = require("../../../lib/pixi/pixi.js")

var HousingProperty = require("../board/properties/housingProperty.js");
var RailroadProperty = require("../board/properties/railroadProperty.js");
var UtilityProperty = require("../board/properties/utilityProperty.js");
var constants = require("./view_constants.js");
var Chance = require("../board/other/chance.js");
var CommunityChest = require("../board/other/communityChest");
var IncomeTax = require("../board/taxes/incomeTax");
var LuxuryTax = require("../board/taxes/luxuryTax");

function MonopolyView(gameState) {
    this.game = gameState;
    this.game.updateState("start");
    this.tiles = [];
    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0x1099bb});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
    this.activeCardView = null; // empty obj for later use, here for clarity
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
    for (i = 0; i < this.game.board.tiles.length; i++) {
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

            jail = this.drawJail(x_pos, y_pos);
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
            var free_parking = this.drawFreeParking(x_pos, y_pos);
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
            var go_jail = this.drawGoToJail(x_pos, y_pos);
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
            var property = this.drawTile(x_pos + x_correction, y_pos + y_correction, this.game.board.tiles[i], rotation);
            property.rotation = rotation;
            this.tiles.push(property);
            this.stage.addChild(property);

            x_pos += x_inc;
            y_pos += y_inc;
        }
    }
    // rescale and place logo
    this.stage.addChild(this.drawLogo());

    this.drawPlayers();
    this.drawAllPlayersInfo();
    this.drawMessage();
    this.drawChanceDeck();
    this.drawCommunityChestDeck();

    // run the render loop
    this.animate();
}

MonopolyView.prototype.drawChanceDeck = function() {
    var deck = new PIXI.Graphics();
    deck.x = constants.leftBuffer + (constants.tileLongSide) + 30;
    deck.y = constants.upperBuffer + (constants.tileLongSide) + 30 + 150;

    deck.beginFill(0xE68900, 1);
    deck.drawRect(0, 0, 200, 100);

    var font = {
        font: '30px cursive',
        align : 'center',
        wordWrap : true,
        strokeThickness : 1,
        wordWrapWidth : 200
    };
    var text = new PIXI.Text("Chance", font);
    text.x = 50;
    text.y = 30;

    deck.addChild(text);

    deck.rotation = -Math.PI / 4;

    this.stage.addChild(deck);
};

MonopolyView.prototype.drawCommunityChestDeck = function() {
    var deck = new PIXI.Graphics();
    deck.x = (constants.boardWidth + constants.leftBuffer - 200) - ((constants.tileLongSide) + 30) + 180;
    deck.y = constants.upperBuffer + constants.boardHeight - 100 - ((constants.tileLongSide) + 30) - 50;

    deck.beginFill(0xFFFF66, 1);
    deck.drawRect(0, 0, 200, 100);

    var font = {
        font: '30px cursive',
        align : 'center',
        wordWrap : true,
        strokeThickness : 1,
        wordWrapWidth : 200
    };
    var text = new PIXI.Text("Community Chest", font);
    text.x = 25;
    text.y = 10;

    deck.addChild(text);

    deck.rotation = 3 * Math.PI / 4;

    this.stage.addChild(deck);
};

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
    var chanceText = new PIXI.Text("Chance", font);
    chanceText.x = 30;
    chanceText.y = 30;
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
  var chanceText = new PIXI.Text("Community Chest", font);
  chanceText.x = 30;
  chanceText.y = 30;
  return this.drawCard(xPos, yPos, width, height, chanceCard.text, 0xFFFF66, chanceText);
};

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
                                        wordWrapWidth : (width - 40)
                                        });
    cardText.x = 20;
    cardText.y = 85;
    card.addChild(cardText);

    return card;
};



MonopolyView.prototype.setupPropertyClick = function(tile, property){
    tile.interactive = true;
    var context = this;

    tile.click = function(mouseData){
        if(context.game.getCurrentState() == PROPOSE_TRADE){
            context.game.addPropertyToTrade(property);
        }
    };
};

MonopolyView.prototype.setupPlayerClick = function(rect, player){
    rect.interactive = true;
    var context = this;
    rect.click = function(mouseData){
        if(context.game.getCurrentState() == PROPOSE_TRADE){
            if(player != context.game.getCurrentPlayer()){
                context.game.addPlayerToTrade(player);
            }
        }
    };
};

//this is a bit of a hack to make the entire property viewable but it works
MonopolyView.prototype.addClickableBox = function(x_pos, y_pos, property, rotation) {

    box = new PIXI.Graphics();
    box.lineStyle(1, 0, 1);
    box.beginFill(0x44C0DF, 0);
    box.x = x_pos;
    box.y = y_pos;
    box.pivot.set(constants.tileShortSide, constants.tileLongSide);
    box.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    this.setupPropertyClick(box, property);
    
    box.rotation = rotation;
    this.stage.addChild(box);

}

MonopolyView.prototype.drawTile = function(x_pos, y_pos, tile, rotation) {
    if (tile instanceof HousingProperty) {
        property = this.drawProperty(x_pos, y_pos, tile);
        this.addClickableBox(x_pos, y_pos, tile, rotation);
    } else if (tile instanceof RailroadProperty) {
        property = this.drawRailroadProperty(x_pos, y_pos, tile);
        this.addClickableBox(x_pos, y_pos, tile, rotation);
    } else if (tile instanceof UtilityProperty) {
        property = this.drawUtilityProperty(x_pos, y_pos, tile);
        this.addClickableBox(x_pos, y_pos, tile, rotation);
    } else if (tile instanceof Chance) {
        property = this.drawChanceTile(x_pos, y_pos, tile);
    } else if (tile instanceof CommunityChest) {
        property = this.drawCommunityChestTile(x_pos, y_pos, tile);
    } else if (tile instanceof LuxuryTax) {
        property = this.drawLuxuryTaxTile(x_pos, y_pos, tile);
    } else if (tile instanceof IncomeTax) {
        property = this.drawIncomeTaxTile(x_pos, y_pos, tile);
    }

    else {
        property = new PIXI.Graphics();
        property.lineStyle(1, 0, 1);
        property.x = x_pos;
        property.y = y_pos;
        property.pivot.set(constants.tileShortSide, constants.tileLongSide);
        property.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);
    }

        // property = this.drawProperty(x_pos, y_pos, tile);
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
};

MonopolyView.prototype.drawChanceTile = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();

    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    var qMark = new PIXI.Text("?", {font: '84px Tahoma',
                                    fill: 0x1099bb,
                                    stroke: 0,
                                    align : 'center',
                                    wordWrap : true,
                                    strokeThickness : 4,
                                    wordWrapWidth : (constants.tileShortSide),
                                    });
    qMark.x =  constants.tileShortSide / 2;
    qMark.y =  constants.tileLongSide / 2;
    qMark.anchor.set(.5, .5);
    tile.addChild(qMark);

    var name = new PIXI.Text(property.name, {font: '10px Arial',
                                            align : 'center',
                                            wordWrap : true,
                                            strokeThickness : .25,
                                            wordWrapWidth : (constants.tileShortSide),
                                            });
    name.x = constants.tileShortSide / 2;
    name.y = constants.textPadding;
    name.anchor.set(.5, 0);
    tile.addChild(name);

    return tile;
};

MonopolyView.prototype.drawCommunityChestTile = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();

    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    // create a texture from an image path
    var texture = PIXI.Texture.fromImage('assets/community_chest.png');


    // rescale and place logo
    var logo = new PIXI.Sprite(texture);

    logo.width = constants.tileShortSide;
    logo.height = constants.tileShortSide;

    logo.position.x = 0;
    logo.position.y = constants.tileLongSide / 2 - constants.textPadding;

    tile.addChild(logo);

    var name = new PIXI.Text(property.name, {font: '10px Arial',
                                        align : 'center',
                                        wordWrap : true,
                                        strokeThickness : .25,
                                        wordWrapWidth : (constants.tileShortSide),
                                        });
    name.x = constants.tileShortSide / 2;
    name.y = constants.textPadding;
    name.anchor.set(.5, 0);
    tile.addChild(name);


    return tile;
};

MonopolyView.prototype.drawUtilityProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.x = constants.tileShortSide / 2;
        name.y = constants.textPadding;
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

    var logo = new PIXI.Text(property.name, {font: '20px Arial', align : 'center', wordWrap : true, strokeThickness : 1.0});
    logo.y = constants.tileLongSide / 2;
    logo.x = constants.tileShortSide / 2;
    logo.anchor.set(.5, .5);
    tile.addChild(logo);

    return tile;
}

MonopolyView.prototype.drawIncomeTaxTile = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    if (property.name) {
        var name = new PIXI.Text("Pay Tuition Bill", {font: '18px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide) - 10,
                                                });
        name.x = constants.tileShortSide / 2;
        name.y = constants.textPadding;
        name.anchor.set(.5, 0);
        tile.addChild(name);
    }


    var price = new PIXI.Text('$200.00 or 10%', {font: '12px Arial',
                                            align : 'center',
                                            wordWrap : true,
                                            strokeThickness : .25,
                                            //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                            wordWrapWidth : (constants.tileShortSide) - 10,
                                            });
    price.x =  constants.tileShortSide / 2;
    price.y =  constants.tileLongSide - constants.textPadding;
    price.anchor.set(.5, 1);
    tile.addChild(price);


    return tile;
};

MonopolyView.prototype.drawLuxuryTaxTile = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    if (property.name) {
        var name = new PIXI.Text("Pay for Green Print", {font: '18px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide) - 10,
                                                });
        name.x = constants.tileShortSide / 2;
        name.y = constants.textPadding;
        name.anchor.set(.5, 0);
        tile.addChild(name);
    }


    var price = new PIXI.Text('$75.00', {font: '10px Arial',
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


    return tile;
};

MonopolyView.prototype.drawRailroadProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.x = x_pos;
    tile.y = y_pos;
    tile.pivot.set(constants.tileShortSide, constants.tileLongSide);
    tile.drawRect(0, 0, constants.tileShortSide, constants.tileLongSide);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.x = constants.tileShortSide / 2;
        name.y = constants.textPadding;
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

    var logo = new PIXI.Text("DDS", {font: '20px Arial', align : 'center', wordWrap : true, strokeThickness : 1.0});
    logo.y = constants.tileLongSide / 2;
    logo.x = constants.tileShortSide / 2;
    logo.anchor.set(.5, .5);
    tile.addChild(logo);

    return tile;
};

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

MonopolyView.prototype.drawJail = function(x_pos, y_pos) {
    var jail = new PIXI.Graphics();
    jail.x = x_pos;
    jail.y = y_pos;
    jail.lineStyle(1, 0, 1);

    jail.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);

    var jail_texture = PIXI.Texture.fromImage(constants.jailTexturePath);
    var sprt = new PIXI.Sprite(jail_texture);

    sprt.width = constants.tileLongSide / 1.5;
    sprt.height = constants.tileLongSide / 1.5;

    sprt.position.x = constants.tileLongSide / 2;
    sprt.position.y = constants.tileLongSide / 2;

    sprt.anchor.x = .5;
    sprt.anchor.y = .5;

    jail.addChild(sprt);

    return jail;
}

MonopolyView.prototype.drawFreeParking = function(x_pos, y_pos) {
    var green = new PIXI.Graphics();
    green.x = x_pos;
    green.y = y_pos;
    green.lineStyle(1, 0, 1);

    green.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);

    var green_texture = PIXI.Texture.fromImage(constants.greenTexturePath);
    var sprt = new PIXI.Sprite(green_texture);

    sprt.width = constants.tileLongSide / 1.5;
    sprt.height = constants.tileLongSide / 1.5;

    sprt.position.x = constants.tileLongSide / 2;
    sprt.position.y = constants.tileLongSide / 2;

    sprt.anchor.x = .5;
    sprt.anchor.y = .5;

    green.addChild(sprt);

    return green;
}

MonopolyView.prototype.drawFreeParking = function(x_pos, y_pos) {
    var green = new PIXI.Graphics();
    green.x = x_pos;
    green.y = y_pos;
    green.lineStyle(1, 0, 1);

    green.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);

    var green_texture = PIXI.Texture.fromImage(constants.greenTexturePath);
    var sprt = new PIXI.Sprite(green_texture);

    sprt.width = constants.tileLongSide / 1.5;
    sprt.height = constants.tileLongSide / 1.5;

    sprt.position.x = constants.tileLongSide / 2;
    sprt.position.y = constants.tileLongSide / 2;

    sprt.anchor.x = .5;
    sprt.anchor.y = .5;

    green.addChild(sprt);

    return green;
}

MonopolyView.prototype.drawGoToJail = function(x_pos, y_pos) {
    var goToJail = new PIXI.Graphics();
    goToJail.x = x_pos;
    goToJail.y = y_pos;
    goToJail.lineStyle(1, 0, 1);

    goToJail.drawRect(0, 0, constants.tileLongSide, constants.tileLongSide);

    var goodSam = new PIXI.Text('Get Good Sammed', {font: '16px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                wordWrapWidth : (constants.tileLongSide),
                                                });

    goodSam.x =  constants.tileLongSide / 2;
    goodSam.y =  constants.textPadding;
    goodSam.anchor.set(.5, 0);
    goToJail.addChild(goodSam);

    var goToJailTexture = PIXI.Texture.fromImage(constants.goToJailTexturePath);
    var sprt = new PIXI.Sprite(goToJailTexture);

    sprt.width = constants.tileLongSide / 2.0;
    sprt.height = constants.tileLongSide / 2.0;

    sprt.position.x = constants.tileLongSide / 2;
    sprt.position.y = 2 * constants.tileLongSide / 3;

    sprt.anchor.x = .5;
    sprt.anchor.y = .5;

    goToJail.addChild(sprt);

    return goToJail;
}


MonopolyView.prototype.drawLogo = function() {
    var dartmouth_texture = PIXI.Texture.fromImage(constants.logoTexturePath);
    var logo = new PIXI.Sprite(dartmouth_texture);

    logo.width = constants.logoSizeX;
    logo.height = constants.logoSizeY;

    logo.position.x = constants.logoPosX;
    logo.position.y = constants.logoPosY;

    logo.anchor.x = .5;
    logo.anchor.y = .5;
    logo.rotation = constants.logoRotation;

    return logo;
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

MonopolyView.prototype.drawPlayerInfo = function(player) {
    var info = new PIXI.Text(player.name + "\nDBA: $" + player.money, {font: '20px Arial',
                                                align : 'left',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : constants.canvasWidth - constants.boardWidth - (4 * constants.leftBuffer),
                                                });
    return info;
}

MonopolyView.prototype.drawAllPlayersInfo = function() {
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

        this.setupPlayerClick(box, player);

    }
    this.stage.addChild(infoBlock);
};

MonopolyView.prototype.updatePlayerInfo = function(player, index) {
    var info = this.playerInfos[index].text;
    var box = this.playerInfos[index].background;

    if (player === this.game.getCurrentPlayer()) {
        box.alpha = 1;
    } else {
        box.alpha = 0;
    }
    var propertyNames = "";
    for (var i in player.properties) {
        propertyNames += player.properties[i].name;
        propertyNames += ", ";
    }
    info.text = player.name + "\nDBA: $" + player.money + "\nProperties: " + propertyNames;
};

MonopolyView.prototype.updateAllPlayersInfo = function() {
    for (var i in this.game.players) {
        var player = this.game.players[i];
        this.updatePlayerInfo(player, i);
    }
}

MonopolyView.prototype.drawPlayerToken = function(player) {
    var token = new PIXI.Graphics();
    token.lineStyle(1, 0, 1);
    token.beginFill(constants.playerColors[player.color], 1);
    var tile = this.tiles[player.position];
    token.drawRect(5, 50, constants.tokenWidth, constants.tokenHeight);
    tile.addChild(token);
    this.tokenViews.push({token: token, tile: tile});
};

MonopolyView.prototype.drawPlayers = function() {
    this.tokenViews = [];
    for (index in this.game.players) {
        var token = this.drawPlayerToken(this.game.players[index]);
    }
};

MonopolyView.prototype.updatePlayer = function(player, index) {
    var playerView = this.tokenViews[index];
    var token = playerView.token;

    // remove the token from the previous tile
    var previousTile = playerView.tile;
    previousTile.removeChild(token);

    // add the token as a child to the new tile
    var currentTile = this.tiles[player.position];
    currentTile.addChild(token);
    this.tokenViews[index] = {token: token, tile: currentTile};

    // calculate an offset for the token if there are multiple
    var count = 0;
    for (i = 0; i < index; i++) {
        if (this.game.players[i].position == player.position) {
            count++;
        }
    }
    token.x = ((constants.tokenWidth + 2) * count);
}

MonopolyView.prototype.updatePlayers = function() {
    for (index in this.game.players) {
        this.updatePlayer(this.game.players[index], index);
    }
};

MonopolyView.prototype.updateCardsDisplays = function() {
    if (this.game.activeCard && !this.activeCardView) {

        if (this.game.chanceCards.cards.indexOf(this.game.activeCard) >= 0)
            this.activeCardView = this.drawChanceCard(this.game.activeCard);
        else
            this.activeCardView = this.drawCommunityChestCard(this.game.activeCard);

        this.stage.addChild(this.activeCardView);

    } else if (!this.game.activeCard && this.activeCardView) {
        this.stage.removeChild(this.activeCardView);
        this.activeCardView = null;
    }

};

MonopolyView.prototype.drawMessage = function() {
    var container = new PIXI.Container();
    this.messageText = new PIXI.Text(this.game.message, {font: '30px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : constants.canvasWidth - (2 * constants.leftBuffer),
                                                });
    container.x = constants.leftBuffer;
    container.y = constants.boardHeight + (2 * constants.upperBuffer);
    container.addChild(this.messageText);

    // button1
    this.button1 = new PIXI.Graphics();
    this.button1Text = new PIXI.Text("",{});
    this.addButton(this.button1, 0, 0x00FF00, container, "yes_continue", "Yes", this.button1Text);

    // button 2
    this.button2 = new PIXI.Graphics();
    this.button2Text = new PIXI.Text("",{});
    this.addButton(this.button2, 250, 0xFF0000, container, "no_trade_clear", "No", this.button2Text);

    //button 3
    this.button3 = new PIXI.Graphics();
    this.button3Text = new PIXI.Text("",{});
    this.addButton(this.button3, 500, 0x7A7A7A, container, "cancel", "Cancel", this.button3Text);

    //button 4
    this.button4 = new PIXI.Graphics();
    this.button4Text = new PIXI.Text("",{});
    this.addButton(this.button4, 750, 0xFFCC00, container, "add$", "+$20", this.button4Text, 20);

    //button 5
    this.button5 = new PIXI.Graphics();
    this.button5Text = new PIXI.Text("",{});
    this.addButton(this.button5, 1000, 0xFFCC00, container, "subtract$", "-$20", this.button5Text, -20);

};

MonopolyView.prototype.addButton = function(btn, x, color, container, ans, text, btnText, money){
    btn.x = x;
    btn.y = 180;
    btn.beginFill(color, 1);
    btn.drawRect(0, 0, 200, 50);
    container.addChild(btn);
    var context = this;
    btn.interactive = true;
    btn.click = function(mouseData) {
        if (money){
            context.game.addMoneyToTrade(money);
        } else {
            context.game.updateState(ans);
        }
    }

    btnText.text = text;
    btnText.style = {font: '30px Arial',
                    align : 'center',
                    wordWrap : true,
                    strokeThickness : .25,
                    wordWrapWidth : 150,
                    };
    btnText.x = 50;
    btn.addChild(btnText);

    this.stage.addChild(container);
} 


MonopolyView.prototype.updateMessage = function() {
    this.messageText.text = this.game.message;

    switch (this.game.getCurrentState()) {

        case BUY_PROMPT:

            this.button1Text.text = "Yes";
            this.button2Text.text = "No";
            this.button2.alpha = 1;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
            this.button5.alpha = 0;
            break;

        case TRADE_ANSWER:
            this.button1Text.text = "Yes";
            this.button2Text.text = "No";
            this.button2.alpha = 1;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
            this.button5.alpha = 0;
            break; 

        case POST_TURN:

            this.button1Text.text = "Continue";
            this.button2Text.text = "Trade";
            this.button2.alpha = 1;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
            this.button5.alpha = 0;
            break;

        case PROPOSE_TRADE:

            this.button1Text.text = "Continue";
            this.button2Text.text = "Clear";
            this.button2.alpha = 1;
            this.button3.alpha = 1;
            this.button4.alpha = 1;
            this.button5.alpha = 1;
            break;

        default:
            this.button1Text.text = "Continue";
            this.button2Text.text = "";
            this.button2.alpha = 0;
            this.button3.alpha = 0;
            this.button4.alpha = 0;
            this.button5.alpha = 0;
            break;
    }
    
};

MonopolyView.prototype.updateProperties = function() {
    for (var i in this.tiles) {
        var property = this.game.board.tiles[i];
        if (property.owner) {
            var tile = this.tiles[i];
            var ownerTag = new PIXI.Graphics();
            ownerTag.x = 0;
            ownerTag.y = constants.tileLongSide - 15;
            ownerTag.beginFill(constants.playerColors[property.owner.color], 1);
            ownerTag.drawRect(0, 0, constants.tileShortSide, 15);
            tile.addChild(ownerTag);
        }
    }
};

MonopolyView.prototype.updateTradeInfo = function(){
    
    if (this.game.getCurrentState() == PROPOSE_TRADE){
        var trade_player_name = "";
        if (!this.game.trade.answeringPlayer){
            trade_player_name = "Select Player";
        } else {
            trade_player_name = this.game.trade.answeringPlayer.name;
        }
        this.messageText.text = this.game.message + "\nTrading with: " + trade_player_name + "\n" + this.game.trade.itemsToString();
    }
};

MonopolyView.prototype.animate = function() {
    this.updatePlayers();
    this.updateAllPlayersInfo();
    this.updateCardsDisplays();
    this.updateMessage();
    this.updateProperties();
    this.updateTradeInfo();
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
};

module.exports = MonopolyView;


