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
viewConstants.hexagonPoints = [
    [40, -69],
    [-40, -69],
    [-80, 0],
    [-40, 69],
    [40, 69],
    [80, 0],
];

viewConstants.hexagonRadius = 80;

viewConstants.playerColors = [
    0xFFFFFF,
    0xFF0000,
    0x0000FF,
    0xFF9900,
];

viewConstants.resourceColors = [
    0x007827,
    0xD85C38,
    0x00E700,
    0xFAB600,
    0xA8BEB7,
    0xC08E37
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


