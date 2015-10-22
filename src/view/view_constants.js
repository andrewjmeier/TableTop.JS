var viewConstants = new Object();

// START CONSTANTS

// CANVAS
// Constants defining the canvas properties
viewConstants.canvasWidth = 1500;
viewConstants.canvasHeight = 1200;

viewConstants.leftBuffer = 50;
viewConstants.rightBuffer = 50;
viewConstants.upperBuffer = 50;

// BOARD
// Constants for defining the board on top of the canvas
viewConstants.boardWidth = 800;
viewConstants.boardHeight = 800;

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

// JAIL SPACE
viewConstants.jailTexturePath = 'assets/patch.jpg';

// FREE PARKING SPACE
viewConstants.greenTexturePath = 'assets/green.jpg';

// GO TO JAIL SPACE
viewConstants.goToJailTexturePath = 'assets/jailGuy.png';
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
];

viewConstants.playerColors = [
    0xFF0000,
    0x00FF00,
    0x0000FF,
    0xFF00FF,
    0x00FFFF,
    0xFFFF00,
];

// DARTMOUTH LOGO
// Constants for drawing Dartmouth logo at center of board
viewConstants.logoTexturePath = 'assets/Big_D.png';
viewConstants.logoSizeX = 300;
viewConstants.logoSizeY = 200;

viewConstants.logoPosX = viewConstants.leftBuffer + (viewConstants.boardWidth / 2);
viewConstants.logoPosY = viewConstants.upperBuffer + (viewConstants.boardHeight / 2);

viewConstants.logoRotation = - Math.PI * .25;

viewConstants.tokenWidth = 10;
viewConstants.tokenHeight = 10;

// END CONSTANTS

module.exports = viewConstants;


