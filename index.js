
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

function Property(name, mortgage_cost, property_group) { 
  Space.call(this, name);
  this.mortgage = mortgage_cost;
  this.property_group = property_group; // "red", "blue", "railroad", etc.
  this.owner = null;
}
Property.prototype = Object.create(Space.prototype); // subclassing space

// rent should be array with following format: 
// [1 owned, 2 owned ... (3 owned, 4 owned)]
function UtilityProperty(name, mortgage_cost, property_group, rent) { 
  this.rent = rent;
  Property.call(this, this.name, this.mortage_cost, this.property_group);
}
UtilityProperty.prototype = Object.create(Property.prototype);
UtilityProperty.prototype.perform_landing_action = function(player) { 
}; 

// rent should be array with following format: 
// [rent, 1 house, 2 houses, 3 houses, 4 houses, hotel] 
function HousingProperty(name, mortgage_cost, property_group, rent) { 
  this.rent = rent;
  Property.call(this, this.name, this.mortage_cost, this.property_group);
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
  this.tax_amount = 200;
}
IncomeTax.prototype = Object.create(Tax.prototype);

function SuperTax() { 
  this.tax_amount = 100;
}
SuperTax.prototype = Object.create(Tax.prototype);

function Go() {}
Go.prototype = Object.create(Space.prototype);
Go.prototype.perform_landing_action = function(player) { 
  this.player.money += 400;
}; 


// end of space class definitions


// now let's build the board 
var board; 
function build_board() { 
  board = new Board();
  build_spaces(board);
} 

// order is important
// todo: fill in all the board spaces w/ data
function build_spaces(board) { 
  board.spaces = [ 
    new Go()
  ];
} 
