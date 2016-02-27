var inherits = require('util').inherits;
// var Deck = require("../../../tabletop/core/deck.js");
// var Card = require("../../../tabletop/core/card.js");
var TableTop = require('../../../tabletop/tabletop');

function ChanceDeck() {
  TableTop.Deck.call(this);
  this.cards = buildChanceDeck();
};

inherits(ChanceDeck, TableTop.Deck);

var buildChanceDeck = function() {

  var chance1 = new TableTop.Card("Advance to Go (Collect $200)", function(game) {
    var player = game.getCurrentPlayer();
    return game.moveTo(0, player);
    // return game.board.tiles[0].performLandingAction(game);
  });

  var chance2 = new TableTop.Card("Advance to North Mass.", function(game) {
    var player = game.getCurrentPlayer();
    return game.moveTo(24, player);
    // return game.board.tiles[24].performLandingAction(game);
  });

  var chance3 = new TableTop.Card("Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total of ten times the amount thrown.", function(game) {
    var player = game.getCurrentPlayer();
    var token = player.getToken();
    var position = game.board.getTileIndexForToken(token);
    if (position > 11 && position < 28) {
      // move to water works
      return game.moveTo(28, player);
      // return game.board.tiles[28].performLandingAction(game);
    } else {
      // move to electric company
      return game.moveTo(12, player);
      // return game.board.tiles[12].performLandingAction(game);
    }

    // TODO - pay owner 10x dice
  });

  var chance4 = new TableTop.Card("Advance token to the nearest DDS Location and pay owner twice the rental to which he/she is otherwise entitled. If dining area is unowned, you may buy it from the Bank.", function(game) {
    var player = game.getCurrentPlayer();
    var token = player.getToken();
    var position = game.board.getTileIndexForToken(token);
    var space;
    if (position >= 35 || position < 5) {
      // Reading RR
      space = 5;
    } else if (position >= 25) {
      // Short Line
      space = 35;
    } else if (position >= 15) {
      // B & O
      space = 25;
    } else {
      // Penn RR
      space = 15;
    }

    return game.moveTo(space, player);
    // return game.board.tiles[space].performLandingAction(game);
    // TODO - pay owner twice rent
  });

  var chance6 = new TableTop.Card("Advance to Gile Hall - if you pass Go, collect $200", function(game) {
    var player = game.getCurrentPlayer();
    return game.moveTo(11, player);
    // return game.board.tiles[11].performLandingAction(game);
  });

  var chance7 = new TableTop.Card("Financial aid office pays you dividend of $50", function(game) {
    game.getCurrentPlayer().makeDeposit(50);
    return POST_TURN;
  });

  var chance8 = new TableTop.Card("Get out of Hpo free - this card may be kept until needed, or traded/sold", function(game) {
    game.getCurrentPlayer().getOutOfJailFreeCards += 1;
    return POST_TURN;
  });

  var chance9 = new TableTop.Card("Go back 3 spaces", function(game) {
    var player = game.getCurrentPlayer();
    var token = player.getToken();
    var position = game.board.getTileIndexForToken(token);
    if (position < 3) {
      return game.move(40 - 3, player, false);
    } else {
      return game.move(-3, player, false);
    }
  });

  var chance10 = new TableTop.Card("Go directly to Hpo - do not pass Go, do not collect $200", function(game) {
    var player = game.getCurrentPlayer();
    return game.sendToJail(player);

    // var token = player.getToken();
    // var position = game.board.getTileIndexForToken(token);
    // return game.board.tiles[position].performLandingAction(game);   
  });

  var chance11 = new TableTop.Card("Make general repairs on all your residence halls - for each house pay $25 - for each hotel $100", function(game) {
    var player = game.getCurrentPlayer();
    var housesCount = 0;
    var hotelsCount = 0;
    for (var prop in player.properties) {
      if (player.properties.hasOwnProperty(prop)) {
        if (player.properties[prop].hasHotel()) {
          hotelsCount += 1;
        } else {
          housesCount += player.properties[prop].numHouses;
        }
      }
    }
    var total = 25 * housesCount + 100 * hotelsCount;

    // TODO - update this for correct value
    player.makePayment(total);
    return POST_TURN;
  });

  var chance12 = new TableTop.Card("Get late night at East Wheelock snack bar. Pay $15", function(game) {
    game.getCurrentPlayer().makePayment(15);
    return POST_TURN;
  });

  var chance13 = new TableTop.Card("Grab a bite to eat. Advance to the Novack Cafe - if you pass Go collect $200", function(game) {
    var player = game.getCurrentPlayer();
    return game.moveTo(5, player);
    // return game.board.tiles[5].performLandingAction(game);   
  });

  var chance14 = new TableTop.Card("Take a walk down Tuck Drive - advance token to McLane", function(game) {
    var player = game.getCurrentPlayer();
    return game.moveTo(39, player);
    // return game.board.tiles[39].performLandingAction(game);   
  });

  var chance15 = new TableTop.Card("You have been elected to Student Assembly - pay each player $50 (for the Patagonias).", function(game) {
    game.getCurrentPlayer().payPlayers(50, game.players);
    return POST_TURN;
  });

  var chance16 = new TableTop.Card("Your building loan matures - collect $150", function(game) {
    game.getCurrentPlayer().makeDeposit(150);
    return POST_TURN;
  });

  var chance17 = new TableTop.Card("You have won IM Hockey - collect $100", function(game) {
    game.getCurrentPlayer().makeDeposit(100);
    return POST_TURN;
  });

  return [chance3];
  // return [chance1, chance2, chance3, chance4, chance4, chance6, chance7, chance8, chance9, chance10, chance11, chance12, chance13, chance14, chance15, chance16, chance17];
};

module.exports = ChanceDeck;
