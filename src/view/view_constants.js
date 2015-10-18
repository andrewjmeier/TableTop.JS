var viewConstants = new Object();

// START CONSTANTS

// CANVAS
// Constants defining the canvas properties
viewConstants.canvasWidth = 900;
viewConstants.canvasHeight = 2000;

viewConstants.leftBuffer = 50;
viewConstants.rightBuffer = 50;
viewConstants.upperBuffer = 50;

// BOARD
// Constants for defining the board on top of the canvas
viewConstants.boardWidth = viewConstants.canvasWidth - viewConstants.leftBuffer - viewConstants.rightBuffer;
viewConstants.boardHeight = viewConstants.boardWidth;

viewConstants.boardStartX = viewConstants.leftBuffer;
viewConstants.boardStartY = viewConstants.upperBuffer;

// PROPERTY
// Constants defining properties of properties
viewConstants.tileLongSide = viewConstants.boardWidth / 7.0;
viewConstants.tileShortSide = ((viewConstants.boardWidth - 2.0 * viewConstants.tileLongSide) / 9.0);
viewConstants.tileColorLength = viewConstants.tileLongSide / 6.0;
viewConstants.textPadding = 5;

// GO SPACE
viewConstants.goArrowXLength = .8 * viewConstants.tileLongSide;
viewConstants.goArrowYLength = .15 * viewConstants.tileLongSide;
viewConstants.goArrowXOffset = 1.25 * viewConstants.goArrowYLength;
viewConstants.goArrowYOffset = (viewConstants.tileLongSide - viewConstants.goArrowXLength) / 2;
viewConstants.goArrowColor = 0xD20019;

// Property Colors
viewConstants.propertyColors = [
    0x6F3A19,
    0x88C8F3,
    0xC90071,
    0xE68900,
    0xD20019,
    0xE6E60F,
    0x0AA345,
    0x2D4A9B,
]

// DARTMOUTH LOGO
// Constants for drawing Dartmouth logo at center of board
viewConstants.logoSizeX = 300;
viewConstants.logoSizeY = 200;

viewConstants.logoPosX = viewConstants.leftBuffer + (viewConstants.boardWidth / 2);
viewConstants.logoPosY = viewConstants.upperBuffer + (viewConstants.boardHeight / 2);

viewConstants.logoRotation = - Math.PI * .25;

viewConstants.tokenWidth = 10;
viewConstants.tokenHeight = 10;

// END CONSTANTS

module.exports = viewConstants;


