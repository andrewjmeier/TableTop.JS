require('./board/boardConstants');

var Go = require('./board/other/go'),
    CommunityChest = require('./board/other/communityChest'),
    IncomeTax = require('./board/taxes/incomeTax'),
    Chance = require('./board/other/chance'),
    Jail = require('./board/jail/jail'),
    GoToJail = require('./board/jail/goToJail'),
    LuxuryTax = require('./board/taxes/luxuryTax'),
    FreeParking = require('./board/other/freeParking'),
    UtilityProperty = require('./board/properties/utilityProperty'),
    HousingProperty = require('./board/properties/housingProperty'),
    RailroadProperty = require('./board/properties/railroadProperty'),
    Board = require('./board/board/board'); // looks ugly, maybe think of better naming pattern

// end of space class definitions


// now let's build the board
var board;
function buildBoard() {
  board = new Board();
  buildSpaces(board);
  return board;
}

function buildSpaces(board) {
  var props = propertiesList();
  board.tiles = [

    // first row
    new Go(),
    propertyForIndex(MEDITERRANEAN_AVE, props),
    new CommunityChest(),
    propertyForIndex(BALTIC_AVE, props),
    new IncomeTax(),
    propertyForIndex(READING_RR, props),
    propertyForIndex(ORIENTAL_AVE, props),
    new Chance(),
    propertyForIndex(VERMONT_AVE, props),
    propertyForIndex(CONNECTICUT_AVE, props),

    // second row
    new Jail(),
    propertyForIndex(ST_CHARLES_PLACE, props),
    propertyForIndex(ELECTRIC_CO, props),
    propertyForIndex(STATES_AVE, props),
    propertyForIndex(VIRGINIA_AVE, props),
    propertyForIndex(PENN_RR, props),
    propertyForIndex(ST_JAMES_PLACE, props),
    new CommunityChest(),
    propertyForIndex(TENNESSEE_AVE, props),
    propertyForIndex(NEW_YORK_AVE, props),

    // third row
    new FreeParking(),
    propertyForIndex(KENTUCKY_AVE, props),
    new Chance(),
    propertyForIndex(INDIANA_AVE, props),
    propertyForIndex(ILLINOIS_AVE, props),
    propertyForIndex(BO_RR, props),
    propertyForIndex(ATLANTIC_AVE, props),
    propertyForIndex(VENTNOR_AVE, props),
    propertyForIndex(WATERWORKS, props),
    propertyForIndex(MARVIN_GARDENS, props),

    // fourth row
    new GoToJail(),
    propertyForIndex(PACIFIC_AVE, props),
    propertyForIndex(NORTH_CAROLINA_AVE, props),
    new CommunityChest(),
    propertyForIndex(PENNSYLVANIA_AVE, props),
    propertyForIndex(SHORTLINE_RR, props),
    new Chance(),
    propertyForIndex(PARK_PLACE, props),
    new LuxuryTax(),
    propertyForIndex(BOARDWALK, props),

  ];
}

// indices correlate to order in below function propertiesList()
function propertyForIndex(index, props) {
  if (index === 5 || index === 15 || index === 25 || index === 35) {
    return new RailroadProperty(props[index][0]);
  } else if (index === 12 || index === 28) {
    return new UtilityProperty(props[index][0], props[index][2]);
  } else {
    return new HousingProperty(props[index][0], props[index][2], props[index][1], props[index][4], props[index][3]);
  }
}

/* housing properties: [name, color, cost, house cost, [rent, 1, 2, 3, 4, hotel]]
 railroads: [name, "Railroad", cost, [1, 2, 3, 4]]
 utilities: [name, "Utility", cost]
*/
function propertiesList() {
  return [
    [],
    ["French Hall", PG_BROWN, 60, 50, [2, 10, 30, 90, 160, 250]],
    [],
    ["Judge Hall", PG_BROWN, 60, 50, [4, 20, 60, 180, 320, 450]],
    [],
    ["Novak Cafe"],
    ["Ripley Hall", PG_LIGHT_BLUE, 100, 50, [6, 30, 90, 270, 400, 550]],
    [],
    ["Woodward Hall", PG_LIGHT_BLUE, 100, 50, [6, 30, 90, 270, 400, 550]],
    ["Smith Hall", PG_LIGHT_BLUE, 120, 50, [8, 40, 100, 300, 450, 600]],

    [],
    ["Gile Hall", PG_PINK, 140, 100, [10, 50, 150, 450, 625, 750]], // 5
    ["ORL"],
    ["Streeter Hall", PG_PINK, 140, 100, [10, 50, 150, 450, 625, 750]],
    ["Lord Hall", PG_PINK, 160, 100, [12, 60, 180, 500, 700, 900]],
    ["Collis Cafe"],
    ["South Fayerweather Hall", PG_ORANGE, 180, 100, [14, 70, 200, 550, 750, 950]],
    [],
    ["Fayerweather Hall", PG_ORANGE, 180, 100, [14, 70, 200, 550, 750, 950]],
    ["North Fayerweather Hall", PG_ORANGE, 200, 100, [16, 80, 220, 600, 800, 1000]], // 10

    [],
    ["South Massachusetts Hall", PG_RED, 220, 150, [18, 90, 250, 700, 875, 1050]],
    [],
    ["Massachusetts Hall", PG_RED, 220, 150, [18, 90, 250, 700, 875, 1050]],
    ["North Massachusetts Hall", PG_RED, 240, 150, [20, 100, 300, 750, 925, 1100]],
    ["Courtyard Cafe"],
    ["Berry Hall", PG_YELLOW, 260, 150, [22, 110, 330, 800, 975, 1150]],
    ["Bildner Hall", PG_YELLOW, 260, 150, [22, 110, 330, 800, 975, 1150]], // 15
    ["FO&M"],
    ["Rauner Hall", PG_YELLOW, 280, 150, [24, 120, 360, 850, 1025, 1200]],

    [],
    ["Andres Hall", PG_GREEN, 300, 200, [26, 130, 390, 900, 1100, 1275]],
    ["Zimmerman Hall", PG_GREEN, 300, 200, [26, 130, 390, 900, 1100, 1275]],
    [],
    ["Morton Hall", PG_GREEN, 320, 200, [28, 150, 450, 1000, 1200, 1400]],
    ["1953 Commons"], // 25
    [],
    ["Fahey Hall", PG_BLUE, 350, 200, [35, 175, 500, 1100, 1300, 1500]], // 20
    [],
    ["McLane Hall", PG_BLUE, 400, 200, [50, 200, 600, 1400, 1700, 2000]],

  ];

}

module.exports = buildBoard;
