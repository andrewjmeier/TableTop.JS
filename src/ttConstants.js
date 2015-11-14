// constants.js

var c = new Object();

// CANVAS
// Constants defining the canvas properties
c.canvasWidth = 1500;
c.canvasHeight = 1200;

c.leftBuffer = 50;
c.rightBuffer = 50;
c.upperBuffer = 50;

// BOARD
// Constants for defining the board on top of the canvas
c.boardWidth = 800;
c.boardHeight = 800;

c.boardStartX = c.leftBuffer;
c.boardStartY = c.upperBuffer;

// COLORS
// Constants defining basic colors.
c.blackColor = 0x000000;
c.redColor = 0xFF0000;
c.blueColor = 0x0000FF;
c.greenColor = 0x0080000;


c.moveTypeManual = 1;
c.moveTypeDiceRoll = 1;

module.exports = c;
