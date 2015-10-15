function MonopolyView(game_state) {
    this.game = game_state

    this.renderer = PIXI.autoDetectRenderer(800, 800, {backgroundColor : 0x1099bb});
    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();
};

MonopolyView.prototype.drawBoard = function() {
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage('assets/Big_D.png');
    var texture2 = PIXI.Texture.fromImage('assets/jail.png');
    var texture3 = PIXI.Texture.fromImage('assets/chance.jpg');
    var texture4 = PIXI.Texture.fromImage('assets/patch.jpg');

    // create a new Sprite using the texture
    var logo = new PIXI.Sprite(texture);
    var jail = new PIXI.Sprite(texture2);
    var chance_image = new PIXI.Sprite(texture3);
    var chance_image2 = new PIXI.Sprite(texture3);
    var chance_image3 = new PIXI.Sprite(texture3);
    var Hpo = new PIXI.Sprite(texture4);

    Hpo.interactive = true;
    Hpo.click = function(mouseData){
       console.log("CLICK!");
    };


    // rescale and place logo
    logo.scale.x = 0.37;
    logo.scale.y = 0.37;
    logo.rotation = -44.78;
    logo.position.x = 100;
    logo.position.y = 458;

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

    this.graphics.set

    // draw rectangles on the top side
    var x = 125;
    var dx = 68.75;
    for (var i = 1; i <= 8; i++){
        this.graphics.drawRect(x, 0, dx, 125);
        x += dx;
    }

    // draw rectangles on the bottom side
    x = 125;
    dx = 68.75;
    for (var i = 1; i <= 8; i++){
        this.graphics.drawRect(x, 675, dx, 125);
        x += dx;
    }

    // draw rectangles on the left side
    var y = 125;
    var dy = 68.75;
    for (var i = 1; i <= 8; i++){
        this.graphics.drawRect(0, y, 125, dy);
        y += dy;
    }

    // draw rectangles on the right side
    var y = 125;
    var dy = 68.75;
    for (var i = 1; i <= 8; i++){
        this.graphics.drawRect(675, y, 125, dy);
        y += dy;
    }

    this.stage.addChild(this.graphics);
    this.stage.addChild(logo);
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

MonopolyView.prototype.animate = function(x_pos, y_pos, orientation, color, name, price) {

}

MonopolyView.prototype.animate = function() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
}

module.exports = MonopolyView;


