var Card = require("./card.js");

var Utils = {
    buildChanceDeck: function() {

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
            player.makePayment(total);
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
            // TODO
        });

        var chance16 = new Card("Your building loan matures - collect $150", function(game) {
            game.getCurrentPlayer().makeDeposit(150);
        });

        var chance17 = new Card("You have won a crossword competition - collection $100", function(game) {
            game.getCurrentPlayer().makeDeposit(100);
        });

        return [chance1, chance2, chance3, chance4, chance4, chance6, chance7, chance8, chance9, chance10, chance11, chance12, chance13, chance14, chance15, chance16, chance17];
    },

    buildCommunityChestDeck: function() {
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
            // TODO
        });

        var card7 = new Card("Grand Opera Night - collect $50 from every player for opening night seats", function(game) {
            // TODO
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
    },

    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    shuffle: function(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
};

module.exports = Utils;
