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
  board.spaces = [ 

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
    new Jail(), 

    // second row
    propertyForIndex(ST_CHARLES_PLACE, props),
    propertyForIndex(ELECTRIC_CO, props),
    propertyForIndex(STATES_AVE, props),
    propertyForIndex(VIRGINIA_AVE, props),
    propertyForIndex(PENN_RR, props),
    propertyForIndex(ST_JAMES_PLACE, props),
    new CommunityChest(),
    propertyForIndex(TENNESSEE_AVE, props),
    propertyForIndex(NEW_YORK_AVE, props),
    new FreeParking(),

    // third row
    propertyForIndex(KENTUCKY_AVE, props),
    new Chance(),
    propertyForIndex(INDIANA_AVE, props),
    propertyForIndex(ILLINOIS_AVE, props),
    propertyForIndex(BO_RR, props),
    propertyForIndex(ATLANTIC_AVE, props),
    propertyForIndex(VENTNOR_AVE, props),
    propertyForIndex(WATERWORKS, props),
    propertyForIndex(MARVIN_GARDENS, props),
    new GoToJail(),
    
    // fourth row
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
  if (index <= 21) { 
    return new HousingProperty(props[index][0], props[index][2], props[index][1], props[index][4]);
  } else if (index <= 25) { 
    return new RailroadProperty(props[index][0], props[index][2], props[index][3]);
  } else { 
    return new UtilityProperty(props[index][0], props[index][2]);
  } 
} 

/* housing properties: [name, color, cost, house cost, [rent, 1, 2, 3, 4, hotel]]
 railroads: [name, "Railroad", cost, [1, 2, 3, 4]]
 utilities: [name, "Utility", cost] 
*/

function propertiesList() { 
  return [ 
    ["Mediterranean Ave", PG_BROWN, 60, 50, [2, 10, 30, 90, 160, 250]], 
    ["Baltic Ave", PG_BROWN, 60, 50, [4, 20, 60, 180, 320, 450]],

    ["Oriental Ave", PG_LIGHT_BLUE, 100, 50, [6, 30, 90, 270, 400, 550]], 
    ["Vermont Ave", PG_LIGHT_BLUE, 100, 50, [6, 30, 90, 270, 400, 550]], 
    ["Connecticut Ave", PG_LIGHT_BLUE, 120, 50, [8, 40, 100, 300, 450, 600]], 

    ["St. Charles Place", PG_PINK, 140, 100, [10, 50, 150, 450, 625, 750]], // 5
    ["States Ave", PG_PINK, 140, 100, [10, 50, 150, 450, 625, 750]], 
    ["Virginia Ave", PG_PINK, 160, 100 [12, 60, 180, 500, 700, 900]], 

    ["St. James Place", PG_ORANGE, 180, 100, [14, 70, 200, 550, 750, 950]], 
    ["Tennessee Ave", PG_ORANGE, 180, 100, [14, 70, 200, 550, 750, 950]], 
    ["New York Ave", PG_ORANGE, 200, 100, [16, 80, 220, 600, 800, 1000]], // 10

    ["Kentucky Ave", PG_RED, 220, 150, [18, 90, 250, 700, 875, 1050]], 
    ["Indiana Ave", PG_RED, 220, 150, [18, 90, 250, 700, 875, 1050]], 
    ["Illinois Ave", PG_RED, 240, 150, [20, 100, 300, 750, 925, 1100]], 

    ["Atlantic Ave", PG_YELLOW, 260, 150, [22, 110, 330, 800, 975, 1150]], 
    ["Ventnor Ave", PG_YELLOW, 260, 150, [22, 110, 330, 800, 975, 1150]], // 15
    ["Marvin Gardens", PG_YELLOW, 280, 150, [24, 120, 360, 850, 1025, 1200]], 

    ["Pacific Ave", PG_GREEN, 300, 200, [26, 130, 390, 900, 1100, 1275]], 
    ["North Carolina Ave", PG_GREEN, 300, 200, [26, 130, 390, 900, 1100, 1275]], 
    ["Pennsylvaniva Ave", PG_GREEN, 320, 200, [28, 150, 450, 1000, 1200, 1400]], 

    ["Park Place", PG_BLUE, 350, 200, [35, 175, 500, 1100, 1300, 1500]], // 20
    ["Boardwalk", PG_BLUE, 400, 200, [50, 200, 600, 1400, 1700, 2000]], 

    ["Reading Railroad", PG_RR, 200, [25, 50, 100, 200]],
    ["Pennsylvania Railroad", PG_RR, 200, [25, 50, 100, 200]],
    ["B. & O. Railroad", PG_RR, 200, [25, 50, 100, 200]],
    ["Shortline Railroad", PG_RR, 200, [25, 50, 100, 200]], // 25

    ["Electric Company", PG_UTIL, 150],
    ["WaterWorks", PG_UTIL, 150]
  ];

}

module.exports = buildBoard;
