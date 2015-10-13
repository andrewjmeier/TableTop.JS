inherits = require('util').inherits;
Deck = require("./deck");
var Card = require("./card.js");


function ChanceDeck() {
    Deck.call(this);
    this.cards = buildChanceDeck();
};

inherits(ChanceDeck, Deck);

var buildChanceDeck = function() {

    var chance1 = new Card("Advance to Go (Collect $200", function(game) {
        game.getCurrentPlayer().moveTo(0);
    });

    var chance2 = new Card("Advance to Illinois Ave.", function(game) {
        game.getCurrentPlayer().moveTo(24);
    });

    var chance3 = new Card("Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total of ten times the amount thrown.", function(game) {
        var player = game.getCurrentPlayer();
        if (player.position > 11 && player.position < 28) {
            // move to water works
            player.moveTo(28);
        } else {
            // move to electric company
            player.moveTo(12);
        }

        // TODO - pay owner 10x dice
    });

    var chance4 = new Card("Advance token to the nearest Railroad and pay owner twice the rental to which he/she is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.", function(game) {
        var player = game.getCurrentPlayer();
        if (player.position >= 35 || player.position < 5) {
            // Reading RR
            player.moveTo(5);
        } else if (player.position >= 25) {
            // Short Line
            player.moveTo(35);
        } else if (player.position >= 15) {
            // B & O
            player.moveTo(25);
        } else {
            // Penn RR
            player.moveTo(15);
        }
        // TODO - pay owner twice rent
    });

    var chance6 = new Card("Advance to St. Charles Place - if you pass Go, collect $200", function(game) {
        game.getCurrentPlayer().moveTo(11);
    });

    var chance7 = new Card("Bank pays you dividend of $50", function(game) {
        game.getCurrentPlayer().makeDeposit(50);
    });

    var chance8 = new Card("Get out of Jail free - this card may be kept until needed, or traded/sold", function(game) {
        game.getCurrentPlayer().getOutOfJailFreeCards += 1;
    });

    var chance9 = new Card("Go back 3 spaces", function(game) {
        var player = game.getCurrentPlayer();
        if (player.position < 3) {
            player.move(40 - 3);
        } else {
            player.move(-3);
        }
    });

    var chance10 = new Card("Go directly to Jail - do not pass Go, do not collect $200", function(game) {
        game.getCurrentPlayer().sendToJail();
    });

    var chance11 = new Card("Make general repairs on all your property - for each house pay $25 - for each hotel $100", function(game) {
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
        var total = 25 * housesCount + 100 * hotelsCount;

        // TODO - update this for correct value
        player.makePayment(0);
    });

    var chance12 = new Card("Pay poor tax of $15", function(game) {
        game.getCurrentPlayer().makePayment(15);
    });

    var chance13 = new Card("Take a trip to Reading Railroad - if you pass Go collect $200", function(game) {
        game.getCurrentPlayer().moveTo(5);
    });

    var chance14 = new Card("Take a walk on the Boardwalk - advance token to Boardwalk", function(game) {
        game.getCurrentPlayer().moveTo(39);
    });

    var chance15 = new Card("You have been elected chairman of the board - pay each player $50", function(game) {
        game.getCurrentPlayer().payPlayers(50, game.players);
    });

    var chance16 = new Card("Your building loan matures - collect $150", function(game) {
        game.getCurrentPlayer().makeDeposit(150);
    });

    var chance17 = new Card("You have won a crossword competition - collection $100", function(game) {
        game.getCurrentPlayer().makeDeposit(100);
    });

    return [chance1, chance2, chance3, chance4, chance4, chance6, chance7, chance8, chance9, chance10, chance11, chance12, chance13, chance14, chance15, chance16, chance17];
};

module.exports = ChanceDeck;