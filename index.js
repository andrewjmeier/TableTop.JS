console.log("hello there")

var Player = {
	name: "",
	money: 500,
	properties: [],
	position: 0,
	hasGetOutFreeCard: false,
	inJail: false,
	turnsInJail: 0,

	payBail: function() {
		this.releaseFromJail();
		this.money -= 50;
	},

	getOutOfJailFree: function() {
		this.releaseFromJail();
		this.hasGetOutFreeCard = false;
	},

	releaseFromJail: function() {
		this.inJail = false;
		this.turnsInJail = 0;
	},


};

var john = Object.create(Player);
john.name = "John";

var steve = Object.create(Player);
steve.name = "Steve";

var sam = Object.create(Player);
sam.name = "Sam";

var players = [john, steve, sam];

var Card = {
	text: "",
	action: null
};

var card1 = Object.create(Card);
card1.text = "Advance to Go (Collect $200)";
card1.action = function(player) {
	player.position = 0;
};

var card2 = Object.create(Card);
card2.text = "Bank error in your favor - collect $75";
card2.action = function(player) {
	player.money += 75;
};

var card3 = Object.create(Card);
card3.text = "Doctor's fees - Pay $50";
card3.action = function(player) {
	player.money -= 50;
};

var card4 = Object.create(Card);
card4.text = "Get out of jail free - this card may be kept until needed, or sold";
card4.action = function(player) {
	player.hasGetOutFreeCard = true;
};

var card5 = Object.create(Card);
card5.text = "Go to jail - go directly to jail - Do not pass Go, do not collect $200";
card5.action = function(player) {
	player.position = 10;
	player.inJail = true;
};

var card6 = Object.create(Card);
card6.text = "It is your birthday Collect $10 from each player";
card6.action = function(player) {

};

var card7 = Object.create(Card);
card7.text = "Grand Opera Night - collect $50 from every player for opening night seats";
card7.action = function(player) {

};

var card8 = Object.create(Card);
card8.text = "Income Tax refund - collect $20";
card8.action = function(player) {
	player.money += 20;
};

var card9 = Object.create(Card);
card9.text = "Life Insurance Matures - collect $100";
card9.action = function(player) {
	player.money += 100;
};

var card10 = Object.create(Card);
card10.text = "Pay Hospital Fees of $100";
card10.action = function(player) {
	player.money -= 100;
};

var card11 = Object.create(Card);
card11.text = "Pay School Fees of $50";
card11.action = function(player) {
	player.money -= 50;
};

var card12 = Object.create(Card);
card12.text = "Receive $25 Consultancy Fee";
card12.action = function(player) {
	player.money += 25;
};

var card13 = Object.create(Card);
card13.text = "You are assessed for street repairs - $40 per house, $115 per hotel";
card13.action = function(player) {
	var housesCount = 0;
	var hotelsCount = 0;
	for (var prop in player.properties) {
		if (player.properties.hasOwnProperty(prop)) {
		// or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
			// TODO - link up correctly w/ property object
			housesCount += player.properties[prop].numberOfHouses;
			if (player.properties[prop].hasHotel) {
				hotelsCount += 1;
			}
		}
	}
	var total = 40 * housesCount + 115 * hotelsCount;
	player.money -= total;
};

var card14 = Object.create(Card);
card14.text = "You have won second prize in a beauty contest - collect $10";
card14.action = function(player) {
	player.money += 10;
};

var card15 = Object.create(Card);
card15.text = "You inherit $100";
card15.action = function(player) {
	player.money += 100;
};

var card16 = Object.create(Card);
card16.text = "From sale of stock you get $50";
card16.action = function(player) {
	player.money += 50;
};

var card17 = Object.create(Card);
card17.text = "Holiday Fund matures - Receive $100";
card17.action = function(player) {
	player.money += 100;
};

var communityChestDeck = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17];


var chance1 = Object.create(Card);
chance1.text = "Advance to Go (Collect $200)";
chance1.action = function(player) {
	player.position = 0;
};

var chance2 = Object.create(Card);
chance2.text = "Advance to Illinois Ave.";
chance2.action = function(player) {
	player.position = 24;
};

var chance3 = Object.create(Card);
chance3.text = "Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total of ten times the amount thrown.";
chance3.action = function(player) {
	if (player.position > 11) {
		// move to water works
		player.position = 28;
	} else {
		// move to electric company
		player.position = 12;
	}

	// TODO - pay owner 10x dice
};

var chance4 = Object.create(Card);
chance4.text = "Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.";
chance4.action = function(player) {
	if (player.position >= 35) {
		// Reading RR
		player.position = 5;
		player.money += 200;
	} else if (player.position >= 25) {
		// Short Line
		player.position = 35;
	} else if (player.position >= 15) {
		// B & O
		player.position = 25;
	} else if (player.position >= 5) {
		// Penn RR
		player.position = 15;
	} else {
		// Reading RR w/out $200 for passing go
		player.position = 5;
	}
	// TODO - pay owner twice rent
};

var chance5 = Object.create(Card);
chance5.text = "Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.";
chance5.action = function(player) {
	if (player.position >= 35) {
		// Reading RR
		player.position = 5;
		player.money += 200;
	} else if (player.position >= 25) {
		// Short Line
		player.position = 35;
	} else if (player.position >= 15) {
		// B & O
		player.position = 25;
	} else if (player.position >= 5) {
		// Penn RR
		player.position = 15;
	} else {
		// Reading RR w/out $200 for passing go
		player.position = 5;
	}
	// TODO - pay owner twice rent
};

var chance6 = Object.create(Card);
chance6.text = "Advance to St. Charles Place - if you pass Go, collect $200";
chance6.action = function(player) {
	// Passed go, collected 200
	if (player.position >= 11) {
		player.money += 200;
	}
	player.position = 11;
};

var chance7 = Object.create(Card);
chance7.text = "Bank pays you dividend of $50";
chance7.action = function(player) {
	player.money += 50;
};

var chance8 = Object.create(Card);
chance8.text = "Get out of Jail free - this card may be kept until needed, or traded/sold";
chance8.action = function(player) {
	player.hasGetOutFreeCard = true;
	// TODO - allow players to have multiple get out of jail free cards?
};

var chance9 = Object.create(Card);
chance9.text = "Go back 3 spaces";
chance9.action = function(player) {
	if (player.position < 3) {
		player.position = player.position - 3 + 40;
	} else {
		player.position -= 3;
	}
};

var chance10 = Object.create(Card);
chance10.text = "Go directly to Jail - do not pass Go, do not collect $200";
chance10.action = function(player) {
	player.position = 10;
	player.inJail = true;
};

var chance11 = Object.create(Card);
chance11.text = "Make general repairs on all your property - for each house pay $25 - for each hotel $100";
chance11.action = function(player) {
	var housesCount = 0;
	var hotelsCount = 0;
	for (var prop in player.properties) {
		if (player.properties.hasOwnProperty(prop)) {
		// or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
			// TODO - link up correctly w/ property object
			housesCount += player.properties[prop].numberOfHouses;
			if (player.properties[prop].hasHotel) {
				hotelsCount += 1;
			}
		}
	}
	var total = 25 * housesCount + 100 * hotelsCount;
	player.money -= total;
};

var chance12 = Object.create(Card);
chance12.text = "Pay poor tax of $15";
chance12.action = function(player) {
	player.money -= 15;
};

var chance13 = Object.create(Card);
chance13.text = "Take a trip to Reading Railroad - if you pass Go collect $200";
chance13.action = function(player) {
	player.position = 5;
};

var chance14 = Object.create(Card);
chance14.text = "Take a walk on the Boardwalk - advance token to Boardwalk";
chance14.action = function(player) {
	player.position = 39;
};

var chance15 = Object.create(Card);
chance15.text = "You have been elected chairman of the board - pay each player $50";
chance15.action = function(player) {

};

var chance16 = Object.create(Card);
chance16.text = "Your building loan matures - collect $150";
chance16.action = function(player) {
	player.money += 150;
};

var chance17 = Object.create(Card);
chance17.text = "You have won a crossword competition - collection $100";
chance17.action = function(player) {
	player.money += 100;
};

var chanceDeck = [chance1, chance2, chance3, chance4, chance5, chance6, chance7, chance8, chance9, chance10, chance11, chance12, chance13, chance14, chance15, chance16, chance17];


var Game = {
	players: [],
	currentPlayer: 0,
	board: {},
	dice: [],
	chanceCards: [],
	communityChestCards: [],
	doublesCount: 0,

	randomizeCurrentPlayer: function() {
		this.currentPlayer = Math.floor(Math.random() * this.players.length);
	},

	rollDice: function(numberOfDice, sides) {
		if (!sides) {
			sides = 6;
		}
		this.dice = [];
		for (i = 0; i < numberOfDice; i++) {
			roll = Math.floor(Math.random() * sides) + 1;
			this.dice.push(roll);
		}
	},

	movePlayer: function() {
		this.rollDice(2);
		if (this.players[this.currentPlayer].inJail) {
			this.players[this.currentPlayer].turnsInJail += 1;
			if (this.isDoubles(this.dice)) {
				this.players[this.currentPlayer].releaseFromJail();
				this.move();
			} else if (this.players[this.currentPlayer].turnsInJail === 3) {
				this.players[this.currentPlayer].payBail();
				this.move();
			}
		} else {
			this.move();
		}
	},

	move: function() {
		var spacesToMove = 0;
		for (index in this.dice) {
			spacesToMove += this.dice[index];
		}
		nextPosition = this.players[this.currentPlayer].position + spacesToMove;
		if (nextPosition >= 40) {
			nextPosition = nextPosition % 40;
			this.players[this.currentPlayer].money += 200;
		}
		this.players[this.currentPlayer].position = nextPosition;
	},

	isDoubles: function(dice) {
		return dice[0] === dice[1];
	},

	nextPlayer: function() {
		if (!this.isDoubles(this.dice)) {
			this.doublesCount = 0;
			this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
		} else {
			this.doublesCount += 1;
			if (this.doublesCount === 3) {
				this.doublesCount = 0;
				this.players[this.currentPlayer].inJail = true;
				this.players[this.currentPlayer].position = 10;
				this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
			}
		}
	}
};

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var monopoly = Object.create(Game);

monopoly.players = players;
monopoly.chanceCards = chanceDeck;
monopoly.communityChestCards = communityChestDeck;
shuffle(monopoly.chanceCards);
shuffle(monopoly.communityChestCards);
monopoly.randomizeCurrentPlayer();

n = 0;
while (n < 100) {
	console.log(monopoly.players[monopoly.currentPlayer]);
	monopoly.movePlayer();
	console.log(monopoly.dice);
	monopoly.nextPlayer();
	n += 1;
}


