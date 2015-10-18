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
    board.lineStyle(1, 0x000000, 1);
    board.beginFill(0xC2E2BF, 1);
    board.drawRect(constants.boardStartX, constants.boardStartY, constants.boardWidth, constants.boardHeight);
    this.stage.addChild(board);

    // Initiate variables for drawing tiles
    var x_pos = constants.leftBuffer;
    var y_pos = constants.boardHeight + constants.upperBuffer - constants.tileLongSide;
    var property_index = 0;
    
    // Draw Go
    var go = new PIXI.Graphics();
    go.lineStyle(1, 0, 1);
    go.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileLongSide);
    arrow = this.drawArrow(x_pos, y_pos, 100, 20, constants.propertyColors[4]);
    arrow.pivot.set(0, 0);
    arrow.rotation = .1;
    go.addChild(arrow);
    this.tiles.push(go);
    this.stage.addChild(go);
    property_index += 1;

    // Draw left properties
    for (i = 0; i < 9; i++) {
        y_pos -= constants.tileShortSide;
        var property = this.drawLeftProperty(x_pos, y_pos, this.game.board.spaces[property_index]);
        this.tiles.push(property);
        this.stage.addChild(property);
        property_index += 1;
    }
    
    // Draw Jail
    y_pos -= constants.tileLongSide;
    jail = new PIXI.Graphics();
    jail.lineStyle(1, 0, 1);
    jail.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileLongSide);
    this.tiles.push(jail);
    this.stage.addChild(jail);
    x_pos += constants.tileLongSide;
    property_index += 1;

    // Draw top properties
    for (i = 0; i < 9; i++) {
        var property = this.drawTopProperty(x_pos, y_pos, this.game.board.spaces[property_index]);
        this.tiles.push(property);
        this.stage.addChild(property);
        x_pos += constants.tileShortSide;
        property_index += 1;
    }
    
    // Draw Free Parking
    var free_parking = new PIXI.Graphics();
    free_parking.lineStyle(1, 0, 1);
    free_parking.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileLongSide);
    this.tiles.push(free_parking);
    this.stage.addChild(free_parking);
    y_pos += constants.tileLongSide;
    property_index += 1;

    // Draw right properties
    for (i = 0; i < 9; i++) {
        var property = this.drawRightProperty(x_pos, y_pos, this.game.board.spaces[property_index]);
        this.tiles.push(property);
        this.stage.addChild(property);
        y_pos += constants.tileShortSide;
        property_index += 1;
    }
    
    // Draw Go To Jail
    var go = new PIXI.Graphics();
    go.lineStyle(1, 0, 1);
    go.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileLongSide);
    this.tiles.push(go);
    this.stage.addChild(go);
    x_pos -= constants.tileShortSide;
    property_index += 1;

    // Draw bottom properties
    for (i = 0; i < 9; i++) {
        var property = this.drawBottomProperty(x_pos, y_pos, this.game.board.spaces[property_index]);
        this.tiles.push(property);
        this.stage.addChild(property);
        x_pos -= constants.tileShortSide;
        property_index += 1;
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

    var go_text = new PIXI.Text('Go');
    go_text.scale.x = 1.4;
    go_text.scale.y = 1.4;
    go_text.x = 710;
    go_text.y = 680;

    // draw rectangles on the left side
    var y = 125;
    var dy = 68.75;
    for (var i = 1; i < 10; i++){
        this.drawLeftProperty(0, y, "color", "name", 722);
        y += dy;
    }

    this.graphics.beginFill(0xC2E2BF, 1);

    // draw rectangles on the top side
    var x = 125;
    var dx = 68.75;
    for (var i = 1; i < 10; i++){
        this.graphics.drawRect(x, 0, dx, 125);
        x += dx;
    }

    // draw rectangles on the bottom side
    x = 125;
    dx = 68.75;
    for (var i = 1; i < 10; i++){
        this.graphics.drawRect(x, 675, dx, 125);
        x += dx;
    }

    // draw rectangles on the right side
    var y = 125;
    var dy = 68.75;
    for (var i = 1; i < 10; i++){
        this.graphics.drawRect(675, y, 125, dy);
        y += dy;
    }
    /*
    this.stage.addChild(jail);
    this.stage.addChild(chance);
    this.stage.addChild(community);
    this.stage.addChild(chest);
    this.stage.addChild(jail_text);
    this.stage.addChild(go_text);
    this.stage.addChild(chance_image);
    this.stage.addChild(chance_image2);
    this.stage.addChild(chance_image3);
    this.stage.addChild(Hpo);
*/
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

    // draw an arrow
    this.graphics.lineStyle(2, 0xFF0000, 1);
    this.graphics.moveTo(690, 750);
    this.graphics.lineTo(710, 725);
    this.graphics.moveTo(690, 750);
    this.graphics.lineTo(710, 775);
    this.graphics.moveTo(710, 775);
    this.graphics.lineTo(710, 760);
    this.graphics.moveTo(710, 725);
    this.graphics.lineTo(710, 740);
    this.graphics.moveTo(710, 740);
    this.graphics.lineTo(780, 740);
    this.graphics.moveTo(710, 760);
    this.graphics.lineTo(780, 760);
    this.graphics.moveTo(780, 760);
    this.graphics.lineTo(780, 740);

    // run the render loop
    this.animate();
}

MonopolyView.prototype.drawLeftProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileShortSide);
    
    tile.beginFill(constants.propertyColors[property.propertyGroup], 1);
    tile.drawRect(x_pos + constants.tileLongSide - constants.tileColorLength,
            y_pos, constants.tileColorLength, constants.tileShortSide);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.rotation = Math.PI * .5;
        name.x = x_pos + constants.tileLongSide - constants.tileColorLength - constants.textPadding;
        name.y = y_pos + constants.tileShortSide / 2;
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
        price.rotation = Math.PI * .5;
        price.x = x_pos + constants.textPadding;
        price.y = y_pos + constants.tileShortSide / 2;
        price.anchor.set(.5, 1);
        tile.addChild(price);

    }
   
    return tile;
}

MonopolyView.prototype.drawTopProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.drawRect(x_pos, y_pos, constants.tileShortSide, constants.tileLongSide);
    
    tile.beginFill(constants.propertyColors[property.propertyGroup], 1);
    tile.drawRect(x_pos,
            y_pos + constants.tileLongSide - constants.tileColorLength,
            constants.tileShortSide,
            constants.tileColorLength);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.rotation = Math.PI;
        name.x = x_pos + constants.tileShortSide / 2;
        name.y = y_pos + constants.tileLongSide - constants.tileColorLength - constants.textPadding;
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
        price.rotation = Math.PI;
        price.x = x_pos + constants.tileShortSide / 2;
        price.y = y_pos + constants.textPadding;
        price.anchor.set(.5, 1);
        tile.addChild(price);

    }
   
    return tile;
}

MonopolyView.prototype.drawRightProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.drawRect(x_pos, y_pos, constants.tileLongSide, constants.tileShortSide);
    
    tile.beginFill(constants.propertyColors[property.propertyGroup], 1);
    tile.drawRect(x_pos,
            y_pos, constants.tileColorLength, constants.tileShortSide);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.rotation = Math.PI * 1.5;
        name.x = x_pos + constants.tileColorLength + constants.textPadding;
        name.y = y_pos + constants.tileShortSide / 2;
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
        price.rotation = Math.PI * 1.5;
        price.x = x_pos + constants.tileLongSide - constants.textPadding;
        price.y = y_pos + constants.tileShortSide / 2;
        price.anchor.set(.5, 1);
        tile.addChild(price);

    }
   
    return tile;
}

MonopolyView.prototype.drawBottomProperty = function(x_pos, y_pos, property) {
    var tile = new PIXI.Graphics();
    tile.lineStyle(1, 0, 1);
    tile.drawRect(x_pos, y_pos, constants.tileShortSide, constants.tileLongSide);
    
    tile.beginFill(constants.propertyColors[property.propertyGroup], 1);
    tile.drawRect(x_pos,
            y_pos,
            constants.tileShortSide,
            constants.tileColorLength);

    if (property.name) {
        var name = new PIXI.Text(property.name, {font: '10px Arial',
                                                align : 'center',
                                                wordWrap : true,
                                                strokeThickness : .25,
                                                //wordWrapWidth : (constants.tileLongSide - constants.tileColorLength),
                                                wordWrapWidth : (constants.tileShortSide),
                                                });
        name.x = x_pos + constants.tileShortSide / 2;
        name.y = y_pos + constants.tileColorLength + constants.textPadding;
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
        price.x = x_pos + constants.tileShortSide / 2;
        price.y = y_pos + constants.tileLongSide - constants.textPadding;
        price.anchor.set(.5, 1);
        tile.addChild(price);
    }
   
    return tile;
}

MonopolyView.prototype.drawArrow = function(x_pos, y_pos, x_len, y_len, fill_color) {
    arrow = new PIXI.Graphics();
    arrow.lineStyle(1, 0, 1);
    arrow.beginFill(fill_color);
    point_divisor = 6.0;
    thickness_divisor = 4.0;

    arrow.drawPolygon(x_pos, y_pos + (y_len / 2),
            x_pos + (x_len / point_divisor), y_pos,
            x_pos + (x_len / point_divisor), y_pos + (y_len / thickness_divisor),
            x_pos + x_len, y_pos + (y_len / thickness_divisor),
            x_pos + x_len, y_pos + y_len - (y_len / thickness_divisor),
            x_pos + (x_len / point_divisor), y_pos + y_len - (y_len / thickness_divisor),
            x_pos + (x_len / point_divisor), y_pos + y_len);

    return arrow;
}

MonopolyView.prototype.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
}

module.exports = MonopolyView;


