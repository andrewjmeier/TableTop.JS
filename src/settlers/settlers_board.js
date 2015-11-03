var constants = require("./game_constants");
var Utils = require("../utils");
var DesertTile = require("./desert_tile");
var WoodTile = require("./wood_tile");
var BrickTile = require("./brick_tile");
var WheatTile = require("./wheat_tile");
var OreTile = require("./ore_tile");
var SheepTile = require("./sheep_tile");

var SettlersVertexRightTile = require("./board/settlers_vertex_right_tile");
var SettlersVertexLeftTile = require("./board/settlers_vertex_left_tile");


var leftTile = 0;
var rightTile = 1;

function SettlersBoard() {

  var verticiesMap = {
    "1": {
      type: rightTile,
      adj: [null, "9", "2"],
      tiles: [null, null, 0]
    },
    "2": {
      type: leftTile,
      adj: [null, "1", "3"],
      tiles: [null, 0, null]
    },
    "3": {
      type: rightTile,
      adj: ["2", "11", "4"],
      tiles: [null, 0, 1]
    },
    "4": {
      type: leftTile,
      adj: [null, "3", "5"],
      tiles: [null, 1, null]
    },
    "5": {
      type: rightTile,
      adj: ["4", "13", "6"],
      tiles: [null, 1, 2]
    },
    "6": {
      type: leftTile,
      adj: [null, "5", "7"],
      tiles: [null, 2, null]
    },
    "7": {
      type: rightTile,
      adj: ["6", "15", null],
      tiles: [null, 2, null]
    },
    "8": {
      type: rightTile,
      adj: [null, "18", "9"],
      tiles: [null, null, 3]
    },
    "9": {
      type: leftTile,
      adj: ["1", "8", "10"],
      tiles: [null, 3, 0]
    },
    "10": {
      type: rightTile,
      adj: ["9", "20", "11"],
      tiles: [0, 3, 4]
    },
    "11": {
      type: leftTile,
      adj: ["3", "10", "12"],
      tiles: [0, 4, 1]
    },
    "12": {
      type: rightTile,
      adj: ["11", "22", "13"],
      tiles: [1, 4, 5]
    },
    "13": {
      type: leftTile,
      adj: ["5", "12", "14"],
      tiles: [1, 5, 2]
    },
    "14": {
      type: rightTile,
      adj: ["13", "24", "15"],
      tiles: [2, 5, 6]
    },
    "15": {
      type: leftTile,
      adj: ["7", "14", "16"],
      tiles: [2, 6, null]
    },
    "16": {
      type: rightTile,
      adj: ["15", "26", null],
      tiles: [null, 6, null]
    },
    "17": {
      type: rightTile,
      adj: [null, "28", "18"],
      tiles: [null, null, 7]
    },
    "18": {
      type: leftTile,
      adj: ["8", "17", "19"],
      tiles: [null, 7, 3]
    },
    "19": {
      type: rightTile,
      adj: ["18", "30", "20"],
      tiles: [3, 7, 8]
    },
    "20": {
      type: leftTile,
      adj: ["10", "19", "21"],
      tiles: [3, 8, 4]
    },
    "21": {
      type: rightTile,
      adj: ["20", "32", "22"],
      tiles: [4, 8, 9]
    },
    "22": {
      type: leftTile,
      adj: ["12", "21", "23"],
      tiles: [4, 9, 5]
    },
    "23": {
      type: rightTile,
      adj: ["22", "34", "24"],
      tiles: [5, 9, 10]
    },
    "24": {
      type: leftTile,
      adj: ["14", "23", "25"],
      tiles: [5, 10, 6]
    },
    "25": {
      type: rightTile,
      adj: ["24", "36", "26"],
      tiles: [6, 10, 11]
    },
    "26": {
      type: leftTile,
      adj: ["16", "25", "27"],
      tiles: [6, 11, null]
    },
    "27": {
      type: rightTile,
      adj: ["26", "38", null],
      tiles: [null, 11, null]
    },
    "28":  {
      type: leftTile,
      adj: ["17", null, "29"],
      tiles: [null, null, 7]
    },
    "29": {
      type: rightTile,
      adj: ["28", "39", "30"],
      tiles: [7, null, 12]
    },
    "30": {
      type: leftTile,
      adj: ["19", "29", "31"],
      tiles: [7, 12, 8]
    },
    "31": {
      type: rightTile,
      adj: ["30", "41", "32"],
      tiles: [8, 12, 13]
    },
    "32": {
      type: leftTile,
      adj: ["21", "31", "33"],
      tiles: [8, 13, 9]
    },
    "33": {
      type: rightTile,
      adj: ["32", "43", "34"],
      tiles: [9, 13, 14]
    },
    "34": {
      type: leftTile,
      adj: ["23", "33", "35"],
      tiles: [9, 14, 10]
    },
    "35": {
      type: rightTile,
      adj: ["34", "45", "36"],
      tiles: [10, 14, 15]
    },
    "36": {
      type: leftTile,
      adj: ["25", "35", "37"],
      tiles: [10, 15, 11]
    },
    "37": {
      type: rightTile,
      adj: ["36", "47", "38"],
      tiles: [11, 15, null]
    },
    "38": {
      type: leftTile,
      adj: ["27", "37", null],
      tiles: [11, null, null]
    },
    "39": {
      type: leftTile,
      adj: ["29", null, "40"],
      tiles: [null, null, 12]
    },
    "40": {
      type: rightTile,
      adj: ["39", "48", "41"],
      tiles: [12, null, 16]
    },
    "41": {
      type: leftTile,
      adj: ["31", "40", "42"],
      tiles: [12, 16, 13]
    },
    "42": {
      type: rightTile,
      adj: ["41", "50", "43"],
      tiles: [13, 16, 17]
    },
    "43": {
      type: leftTile,
      adj: ["33", "42", "44"],
      tiles: [13, 17, 14]
    },
    "44": {
      type: rightTile,
      adj: ["43", "52", "45"],
      tiles: [14, 17, 18]
    },
    "45": {
      type: leftTile,
      adj: ["35", "44", "46"],
      tiles: [14, 18, 15]
    },
    "46": {
      type: rightTile,
      adj: ["45", "54", "47"],
      tiles: [15, 18, null]
    },
    "47": {
      type: leftTile,
      adj: ["37", "46", null],
      tiles: [15, null, null]
    },
    "48": {
      type: leftTile,
      adj: ["40", null, "49"],
      tiles: [null, null, 16]
    },
    "49": {
      type: rightTile,
      adj: ["48", null, "50"],
      tiles: [16, null, null]
    },
    "50": {
      type: leftTile,
      adj: ["42", "49", "51"],
      tiles: [16, null, 17]
    },
    "51": {
      type: rightTile,
      adj: ["50", null, "52"],
      tiles: [17, null, null]
    },
    "52": {
      type: leftTile,
      adj: ["44", "51", "53"],
      tiles: [17, null, 18]
    },
    "53": {
      type: rightTile,
      adj: ["52", null, "54"],
      tiles: [18, null, null]
    },
    "53": {
      type: leftTile,
      adj: ["46", "53", null],
      tiles: [18, null, null]
    }
  };

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

  var tilesMap = {};

  for (var key in verticiesMap) {
    var obj = verticiesMap[key];
    var tile;
    if (obj.type === leftTile) {
      tile = new SettlersVertexLeftTile();
    } else {
      tile = new SettlersVertexRightTile();
    }

    var hexList = [];
    for (var i in obj.tiles) {
      var hex = this.spaces[obj.tiles[i]];
      if (obj.tiles[i] !== null && hex !== null) {
        hex.verticies.push(tile);
      }
      hexList.push(hex);
    }
    tile.tiles = hexList;
    tilesMap[key] = tile;
  }

  for (var key in verticiesMap) {
    var obj = verticiesMap[key];
    var tile = tilesMap[key];
    var adjList = [];
    for (var i in obj.adj) {
      adjList.push(tilesMap[obj.adj[i]]);
    }
    tile.addVerticies(adjList);
  }

  this.graph = tilesMap;

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
};

SettlersBoard.prototype.addSettlement = function(settlement, vertexName) {
  this.graph[vertexName].settlement = settlement;
};

// TODO - add method to check if you can build a valid road with these verticies
SettlersBoard.prototype.addRoad = function(road, vertexStart, vertexEnd) {
  var start = this.graph[vertexStart];
  var end = this.graph[vertexEnd];
  for (var i in start.edges) {
    var edge = start.edges[i];
    if (edge && (edge.startVertex == end || edge.endVertex == end)) {
      edge.road = road;
      return true;
    }
  }
  console.log("INVALID ROAD!!!");
  return false;
}

module.exports = SettlersBoard;