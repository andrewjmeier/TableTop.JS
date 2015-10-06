var renderer = PIXI.autoDetectRenderer(800, 800, {backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/monopoly_logo.png');

// create a new Sprite using the texture
var logo = new PIXI.Sprite(texture);

logo.position.x = 400;
logo.position.y = 400;

 // set a fill and a line style again and draw a rectangle
graphics.lineStyle(1, 0x000000, 1);
graphics.beginFill(0xC2E2BF, 1);

// draw center & corner rectangles
graphics.drawRect(0, 0, 125, 125);
graphics.drawRect(0, 675, 125, 125);
graphics.drawRect(675, 0, 125, 125);
graphics.drawRect(125, 125, 550, 550);
graphics.drawRect(675, 675, 125, 125);

// draw rectangles on the top side
var x = 125;
var dx = 68.75;
for (var i = 1; i <= 8; i++){
	graphics.drawRect(x, 0, dx, 125);
	x += dx;
}

// draw rectangles on the bottom side
x = 125;
dx = 68.75;
for (var i = 1; i <= 8; i++){
	graphics.drawRect(x, 675, dx, 125);
	x += dx;
}

// draw rectangles on the left side
var y = 125;
var dy = 68.75;
for (var i = 1; i <= 8; i++){
	graphics.drawRect(0, y, 125, dy);
	y += dy;
}

// draw rectangles on the right side
var y = 125;
var dy = 68.75;
for (var i = 1; i <= 8; i++){
	graphics.drawRect(675, y, 125, dy);
	y += dy;
}

stage.addChild(graphics);
stage.addChild(logo);

// run the render loop
animate();

function animate() {
    requestAnimationFrame(animate);
	renderer.render(stage);
}