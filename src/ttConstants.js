// constants.js

var ttConstants = new Object();

// CANVAS
// Constants defining the canvas properties
ttConstants.canvasWidth = 1500;
ttConstants.canvasHeight = 1200;

ttConstants.leftBuffer = 50;
ttConstants.rightBuffer = 50;
ttConstants.upperBuffer = 50;

// BOARD
// Constants for defining the board on top of the canvas
ttConstants.boardWidth = 800;
ttConstants.boardHeight = 800;

ttConstants.boardStartX = ttConstants.leftBuffer;
ttConstants.boardStartY = ttConstants.upperBuffer;

// COLORS
// Constants defining basic colors.
ttConstants.blackColor = 0x000000;
ttConstants.whiteColor = 0xFFFFFF;
ttConstants.redColor = 0xFF0000;
ttConstants.blueColor = 0x0000FF;
ttConstants.greenColor = 0x0080000;

// MOVE TYPES
// Constants defining how moving occurs

// user selects token, then new position
ttConstants.moveTypeManual = 1;

// user rolls dice, player is moved 
ttConstants.moveTypeDiceRoll = 2;

// MOVE EVALUATION TYPES

// space.performLandingAction() is called 
ttConstants.moveEvaluationTypeLandingAction = 1;

// game.evaluateMove() is called
// after game.isValidMove() verfies move is legal
ttConstants.moveEvaluationTypeGameEvaluator = 2;


module.exports = ttConstants;
