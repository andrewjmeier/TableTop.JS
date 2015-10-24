var constants = require("./game_constants");
var Utils = require("../utils");
var DesertTile = require("./desert_tile");
var WoodTile = require("./wood_tile");
var BrickTile = require("./brick_tile");
var WheatTile = require("./wheat_tile");
var OreTile = require("./ore_tile");
var SheepTile = require("./sheep_tile");


function SettlersBoard() {

  var numbers = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
  Utils.shuffle(numbers);

  var types = [constants.DESERT,
                  constants.WOOD, constants.WOOD, constants.WOOD, constants.WOOD,
                  constants.BRICK, constants.BRICK, constants.BRICK,
                  constants.WHEAT, constants.WHEAT, constants.WHEAT, constants.WHEAT,
                  constants.ORE, constants.ORE, constants.ORE,
                  constants.SHEEP, constants.SHEEP, constants.SHEEP, constants.SHEEP];

  Utils.shuffle(types);
  this.spaces = [];

  var desertFound = false;
  for (var i = 0; i < types.length; i++) {
    numberIndex = desertFound ? i - 1 : i;
    var number = numbers[numberIndex];
    var tile = this.creatTile(types[i], number);
    if (tile instanceof DesertTile) {
      desertFound = true;
    }
    this.spaces.push(tile);
  }
};

SettlersBoard.prototype.creatTile = function(type, number) {
  switch(type) {
    case constants.DESERT:
      return new DesertTile();
    case constants.WOOD:
      return new WoodTile(number);
    case constants.BRICK:
      return new BrickTile(number);
    case constants.WHEAT:
      return new WheatTile(number);
    case constants.ORE:
      return new OreTile(number);
    case constants.SHEEP:
      return new SheepTile(number);
    default:
      return null;
  }
}

module.exports = SettlersBoard;