var viewConstants = new Object();

// START CONSTANTS

// CANVAS
// Constants defining the canvas properties
viewConstants.canvasWidth = 1000;
viewConstants.canvasHeight = 1400;

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

// DARTMOUTH LOGO
// Constants for drawing Dartmouth logo at center of board
viewConstants.logoSizeX = 300;
viewConstants.logoSizeY = 200;

viewConstants.logoPosX = viewConstants.leftBuffer + (viewConstants.boardWidth / 2);
viewConstants.logoPosY = viewConstants.upperBuffer + (viewConstants.boardHeight / 2);

viewConstants.logoRotation = - Math.PI * .25;

// END CONSTANTS

module.exports = viewConstants;


