inherits = require('util').inherits;
Deck = require("./deck");
var Card = require("./card.js");


function CommunityChestDeck() {
    this.cards = buildCommunityChestDeck();
};

inherits(CommunityChestDeck, Deck);

var buildCommunityChestDeck = function() {

    var card1 = new Card("Advance to Go (Collect $200)", function(game) {
        game.getCurrentPlayer().moveTo(0);
    });

    var card2 = new Card("Bank error in your favor - collect $75", function(game) {
        game.getCurrentPlayer().makeDeposit(75);
    });

    var card3 = new Card("Doctor's fees - Pay $50", function(game) {
        game.getCurrentPlayer().makePayment(50);
    });

    var card4 = new Card("Get out of jail free - this card may be kept until needed, or sold", function(game) {
        game.getCurrentPlayer().getOutOfJailFreeCards += 1;
    });

    var card5 = new Card("Go to jail - go directly to jail - Do not pass Go, do not collect $200", function(game) {
        game.getCurrentPlayer().sendToJail();
    });

    var card6 = new Card("It is your birthday Collect $10 from each player", function(game) {
        game.getCurrentPlayer().collectFromPlayers(10, game.players);
    });

    var card7 = new Card("Grand Opera Night - collect $50 from every player for opening night seats", function(game) {
        game.getCurrentPlayer().collectFromPlayers(50, game.players);
    });

    var card8 = new Card("Income Tax refund - collect $20", function(game) {
        game.getCurrentPlayer().makeDeposit(20);
    });

    var card9 = new Card("Life Insurance Matures - collect $100", function(game) {
        game.getCurrentPlayer().makeDeposit(100);
    });

    var card10 = new Card("Pay Hospital Fees of $100", function(game) {
        game.getCurrentPlayer().makePayment(100);
    });

    var card11 = new Card("Pay School Fees of $50", function(game) {
        game.getCurrentPlayer().makePayment(50);
    });

    var card12 = new Card("Receive $25 Consultancy Fee", function(game) {
        game.getCurrentPlayer().makeDeposit(25);
    });

    var card13 = new Card("You are assessed for street repairs - $40 per house, $115 per hotel", function(game) {
        var player = game.getCurrentPlayer();
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
        player.makePayment(total);
    });

    var card14 = new Card("You have won second prize in a beauty contest - collect $10", function(game) {
        game.getCurrentPlayer().makeDeposit(10);
    });

    var card15 = new Card("You inherit $100", function(game) {
        game.getCurrentPlayer().makeDeposit(100);
    });

    var card16 = new Card("From sale of stock you get $50", function(game) {
        game.getCurrentPlayer().makeDeposit(50);
    });

    var card17 = new Card("Holiday Fund matures - Receive $100", function(game) {
        game.getCurrentPlayer().makeDeposit(100);
    });

    return [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16, card17];
};

module.exports = CommunityChestDeck;