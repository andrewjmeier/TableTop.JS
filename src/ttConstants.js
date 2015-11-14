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
c.whiteColor = 0xFFFFFF;
c.redColor = 0xFF0000;
c.blueColor = 0x0000FF;
c.greenColor = 0x0080000;

// MOVE TYPES
// Constants defining how moving occurs

// user selects token, then new position
c.moveTypeManual = 1;

// user rolls dice, player is moved 
c.moveTypeDiceRoll = 2;

// MOVE EVALUATION TYPES

// space.performLandingAction() is called 
c.moveEvaluationTypeLandingAction = 1;

// game.evaluateMove() is called
// after game.isValidMove() verfies move is legal
c.moveEvaluationTypeGameEvaluator = 2;


module.exports = c;
