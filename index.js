// index constants for properties 
var MEDITERRANEAN_AVE = 0;
var BALTIC_AVE = 1;
var ORIENTAL_AVE = 2;
var VERMONT_AVE = 3;
var CONNECTICUT_AVE = 4;
var ST_CHARLES_PLACE = 5;
var STATES_AVE = 6;
var VIRGINIA_AVE = 7;
var ST_JAMES_PLACE = 8;
var TENNESSEE_AVE = 9; 
var NEW_YORK_AVE = 10;
var KENTUCKY_AVE = 11;
var INDIANA_AVE = 12;
var ILLINOIS_AVE = 13;
var ATLANTIC_AVE = 14;
var VENTNOR_AVE = 15;
var MARVIN_GARDENS = 16;
var PACIFIC_AVE = 17;
var NORTH_CAROLINA_AVE = 18;
var PENNSYLVANIA_AVE = 19;
var PARK_PLACE = 20;
var BOARDWALK = 21;
var READING_RR = 22;
var PENN_RR = 23;
var BO_RR = 24;
var SHORTLINE_RR = 25;
var ELECTRIC_CO = 26;
var WATERWORKS = 27;

// placeholder for now - should talk when merged to properly integrate this with 
// existing "board" and "players" implementations
function Board(players) { 
  this.players = players; // just a placeholder for now - on merge should combine 
  this.spaces = [];
} 

// class definitions for any space on the board - 
// properties, utilities, free parking, go, etc. 
function Space(name) { 
  this.name = name; 
  this.occupier = null;
}
// every space needs a landing action
Space.prototype.perform_landing_action = function(){
  console.log("You landed on " + this.name);
}; 

function Property(name, cost, property_group) { 
  Space.call(this, name);
  this.cost = cost;
  this.mortage = .5*cost;
  this.property_group = property_group; // "red", "blue", "railroad", etc.
  this.owner = null;
}
Property.prototype = Object.create(Space.prototype); // subclassing space

// rent should be array with following format: 
// [1 owned, 2 owned ... (3 owned, 4 owned)]
function UtilityProperty(name, cost, property_group, rent) { 
  this.rent = rent;
  Property.call(this, this.name, this.cost, this.property_group);
}
UtilityProperty.prototype = Object.create(Property.prototype);
UtilityProperty.prototype.perform_landing_action = function(player) { 
}; 

// rent should be array with following format: 
// [rent, 1 house, 2 houses, 3 houses, 4 houses, hotel] 
function HousingProperty(name, cost, property_group, rent) { 
  this.rent = rent;
  Property.call(this, this.name, this.cost, this.property_group);
}
HousingProperty.prototype = Object.create(Property.prototype);
HousingProperty.prototype.perform_landing_action = function(player) { 
};


function Chance() {} 
Chance.prototype = Object.create(Space.prototype);
Chance.prototype.perform_landing_action = function(player) { 
}; 

function CommunityChest() {}
CommunityChest.prototype = Object.create(Space.prototype);
Chance.prototype.perform_landing_action = function(player) { 
}; 

function FreeParking() {}
FreeParking.prototype = Object.create(Space.prototype);
FreeParking.prototype.perform_landing_action = function(player) { 
}; 

function Jail() {}
GoToJail.prototype = Object.create(Space.prototype);
GoToJail.prototype.perform_landing_action = function(player) { 
}; 

function GoToJail() {}
GoToJail.prototype = Object.create(Space.prototype);
GoToJail.prototype.perform_landing_action = function(player) { 
}; 

function Tax() { 
  this.tax_amount = 0; // give default value of 0, should be overridden 
}
Tax.prototype = Object.create(Space.prototype);
Tax.prototype.perform_landing_action = function(player) { 
  this.player.money -= this.tax_amount;
}; 

function IncomeTax() {
  this.tax_amount = 200; // flat tax - will give user option later
}
IncomeTax.prototype = Object.create(Tax.prototype);
IncomeTax.prototype.perform_landing_action = function(player) { 
  // todo: prompt user for choice here
  // if (userWantsFlatTax) this.tax_amount = 200; 
  // else this.tax_amount = playerAssetValue(player)*.10;
}; 

function LuxuryTax() { 
  this.tax_amount = 75;
}
LuxuryTax.prototype = Object.create(Tax.prototype);

function Go() {}
Go.prototype = Object.create(Space.prototype);

// end of space class definitions


// now let's build the board 
var board; 
function build_board() { 
  board = new Board();
  build_spaces(board);
} 

// order is important
// todo: finish filling in all the board spaces w/ data
function build_spaces(board) { 
  var props = properties_list();
  board.spaces = [ 

    // first row 
    new Go(),
    property_for_index(MEDITERRANEAN_AVE, props),
    new CommunityChest(),
    property_for_index(BALTIC_AVE, props),
    new IncomeTax(),
    property_for_index(READING_RR, props),
    property_for_index(ORIENTAL_AVE, props),
    new Chance(), 
    property_for_index(VERMONT_AVE, props),
    property_for_index(CONNECTICUT_AVE, props),
    new Jail(), 

    // second row
    property_for_index(ST_CHARLES_PLACE, props),
    property_for_index(ELECTRIC_CO, props),
    property_for_index(STATES_AVE, props),
    property_for_index(VIRGINIA_AVE, props),
    property_for_index(PENN_RR, props),
    property_for_index(ST_JAMES_PLACE, props),
    new CommunityChest(),
    property_for_index(TENNESSEE_AVE, props),
    property_for_index(NEW_YORK_AVE, props),
    new FreeParking(),

    // third
    property_for_index(KENTUCKY_AVE, props),
    new Chance(),
    property_for_index(INDIANA_AVE, props),
    property_for_index(ILLINOIS_AVE, props),
    property_for_index(BO_RR, props),
    property_for_index(ATLANTIC_AVE, props),
    property_for_index(VENTNOR_AVE, props),
    property_for_index(WATERWORKS, props),
    property_for_index(MARVIN_GARDENS, props),
    new GoToJail(),
    
    // fourth
    property_for_index(PACIFIC_AVE, props),
    property_for_index(NORTH_CAROLINA_AVE, props),
    new CommunityChest(),
    property_for_index(PENNSYLVANIA_AVE, props),
    property_for_index(SHORTLINE_RR, props),
    new Chance(), 
    property_for_index(PARK_PLACE, props),
    new LuxuryTax(), 
    property_for_index(BOARDWALK, props),
    
  ];
} 

// indices correlate to order in below function properties_list()
function property_for_index(index, props) { 
  if (index <= 21) { 
    return new HousingProperty(props[index][0], props[index][2], props[index][1], props[index][4]);
  } else if (index <= 25) { 
    return new UtilityProperty(props[index][0], props[index][2], props[index][3]);
  } else { 
    return new UtilityProperty(props[index][0], props[index][2], NULL);
  } 
} 

/* housing properties: [name, color, cost, house cost, [rent, 1, 2, 3, 4, hotel]]
 railroads: [name, "Railroad", cost, [1, 2, 3, 4]]
 utilities: [name, "Utility", cost] 
*/
function properties_list() { 
  return [ 
    ["Mediterranean Ave", "Dark Purple", 60, 50, [2, 10, 30, 90, 160, 250]], 
    ["Baltic Ave", "Dark Purple", 60, 50, [4, 20, 60, 180, 320, 450]],

    ["Oriental Ave", "Light Blue", 100, 50, [6, 30, 90, 270, 400, 550]], 
    ["Vermont Ave", "Light Blue", 100, 50, [6, 30, 90, 270, 400, 550]], 
    ["Connecticut Ave", "Light Blue", 120, 50, [8, 40, 100, 300, 450, 600]], 

    ["St. Charles Place", "Pink", 140, 100, [10, 50, 150, 450, 625, 750]], // 5
    ["States Ave", "Pink", 140, 100, [10, 50, 150, 450, 625, 750]], 
    ["Virginia Ave", "Pink", 160, 100 [12, 60, 180, 500, 700, 900]], 

    ["St. James Place", "Orange", 180, 100, [14, 70, 200, 550, 750, 950]], 
    ["Tennessee Ave", "Orange", 180, 100, [14, 70, 200, 550, 750, 950]], 
    ["New York Ave", "Orange", 200, 100, [16, 80, 220, 600, 800, 1000]], // 10

    ["Kentucky Ave", "Red", 220, 150, [18, 90, 250, 700, 875, 1050]], 
    ["Indiana Ave", "Red", 220, 150, [18, 90, 250, 700, 875, 1050]], 
    ["Illinois Ave", "Red", 240, 150, [20, 100, 300, 750, 925, 1100]], 

    ["Atlantic Ave", "Yellow", 260, 150, [22, 110, 330, 800, 975, 1150]], 
    ["Ventnor Ave", "Yellow", 260, 150, [22, 110, 330, 800, 975, 1150]], // 15
    ["Marvin Gardens", "Yellow", 280, 150, [24, 120, 360, 850, 1025, 1200]], 

    ["Pacific Ave", "Green", 300, 200, [26, 130, 390, 900, 1100, 1275]], 
    ["North Carolina Ave", "Green", 300, 200, [26, 130, 390, 900, 1100, 1275]], 
    ["Pennsylvaniva Ave", "Green", 320, 200, [28, 150, 450, 1000, 1200, 1400]], 

    ["Park Place", "Blue", 350, 200, [35, 175, 500, 1100, 1300, 1500]], // 20
    ["Boardwalk", "Blue", 400, 200, [50, 200, 600, 1400, 1700, 2000]], 

    ["Reading Railroad", "Railroad", 200, [25, 50, 100, 200]],
    ["Pennsylvania Railroad", "Railroad", 200, [25, 50, 100, 200]],
    ["B. & O. Railroad", "Railroad", 200, [25, 50, 100, 200]],
    ["Shortline Railroad", "Railroad", 200, [25, 50, 100, 200]], // 25

    ["Electric Company", "Utility", 150],
    ["WaterWorks", "Utility", 150]
  ];

}

window.onload = function() { 
  build_board();
};
