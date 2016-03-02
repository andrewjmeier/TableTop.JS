var TableTop = require('../../../tabletop/tabletop');
var HousingProperty = require("../board/properties/housingProperty");
var Property = require("../board/properties/property");
var RailroadProperty = require("../board/properties/railroadProperty");
var UtilityProperty = require("../board/properties/utilityProperty");
var $ = require("jquery");

function MonopolyTableView(game, turnMap) {
  TableTop.TableView.call(this, game, turnMap);
  this.subscribeMessageModule();

  this.subscribeSoundModule();
  var context = this;
  
  this.game.subscribe( function(message) {
    if (message.type == "show chance") {
      context.showCard(message.text, "chance");
    }

    if (message.type == "show community chest") {
      context.showCard(message.text, "community-chest");
    }
  });

  $(".tile").click(function(event) {
    var id = $(event.currentTarget).attr("id");
    id = id.substr(4);
    var tile = context.game.board.tiles[id];
    context.setupModalForProperty(tile);
  });

};

inherits(MonopolyTableView, TableTop.TableView);

MonopolyTableView.prototype.updateTrade = function() {

  var trade = this.game.trade;

  if (undefined == trade) {
    return;
  }

  var div = document.createElement("div");
  div.className = "player-info";
  
  var playerName = document.createElement("div");
  playerName.innerHTML = trade.proposingPlayer.name;
  div.appendChild(playerName);

  var propertyContainer = document.createElement("div");
  propertyContainer.className = "property-container";
  div.appendChild(propertyContainer);
  for (var j = 0; j < trade.proposingPlayerItems.property.length; j++) {
    var propDiv = document.createElement("div");
    propDiv.className = "player-property " + this.getCssClassForGroupNumber(trade.proposingPlayerItems.property[j].propertyGroup);
    propDiv.innerHTML = trade.proposingPlayerItems.property[j].name;
    propertyContainer.appendChild(propDiv);
  }

  var player2Name = document.createElement("div");
  if (trade.answeringPlayer) {
    player2Name.innerHTML = trade.answeringPlayer.name;
  }
  div.appendChild(player2Name);

  var propertyContainer2 = document.createElement("div");
  propertyContainer2.className = "property-container";
  div.appendChild(propertyContainer2);

  for (var j = 0; j < trade.answeringPlayerItems.property.length; j++) {
    var propDiv = document.createElement("div");
    propDiv.className = "player-property " + this.getCssClassForGroupNumber(trade.answeringPlayerItems.property[j].propertyGroup);
    propDiv.innerHTML = trade.answeringPlayerItems.property[j].name;
    propertyContainer2.appendChild(propDiv);
  }

  $(".player-box").append(div);


};

MonopolyTableView.prototype.setupModalForProperty = function(property) {
  if (! (property instanceof Property)) {
    return;
  }

  $(".property-name").html(property.name);
  var bar = $(".color-bar");
  bar.removeClass();
  bar.addClass("color-bar");
  bar.addClass(this.getCssClassForGroupNumber(property.propertyGroup));

  console.log(property.mortgage);
  if (undefined != property.mortgage) {
    $(".mortgage").html("Mortgage Value $" + property.mortgage);
  }

  $(".rent").removeClass("hidden");
  $(".one-house").removeClass("hidden");
  $(".two-houses").removeClass("hidden");
  $(".three-houses").removeClass("hidden");
  $(".four-houses").removeClass("hidden");
  $(".hotel").removeClass("hidden");
  $(".houses-cost").removeClass("hidden");

  if (property instanceof HousingProperty) {
    $(".rent").html("Rent $" + property.rent[0]);
    $(".one-house").html("With 1 House $" + property.rent[1]);
    $(".two-houses").html("With 2 Houses $" + property.rent[2]);
    $(".three-houses").html("With 3 Houses $" + property.rent[3]);
    $(".four-houses").html("With 4 Houses $" + property.rent[4]);
    $(".hotel").html("With HOTEL $" + property.rent[5]);

    $(".houses-cost").removeClass("hidden");
    $(".houses-cost").html("Houses cost $" + property.houseCost + " each");
  } else if (property instanceof RailroadProperty) {
    $(".rent").addClass("hidden");
    $(".one-house").html("Rent $" + property.rent[0]);
    $(".two-houses").html("If 2 R.R's are owned $" + property.rent[1]);
    $(".three-houses").html("If 3 &nbsp;&nbsp;&nbsp;&nbsp;''&nbsp;&nbsp;&nbsp;&nbsp; '' &nbsp;&nbsp;&nbsp;&nbsp;''&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$" + property.rent[2]);
    $(".four-houses").html("If 4 &nbsp;&nbsp;&nbsp;&nbsp;''&nbsp;&nbsp;&nbsp;&nbsp; '' &nbsp;&nbsp;&nbsp;&nbsp;''&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$" + property.rent[3]);
    $(".hotel").addClass("hidden");
    $(".houses-cost").addClass("hidden");
  } else if (property instanceof UtilityProperty) {
    $(".rent").html("If one 'Utility' is owned rent is 4 times the amount shown on dice.");
    $(".one-house").html("If both 'Utilities' are owned rent is 10 times the amount shown on dice.")
    $(".two-houses").addClass("hidden");
    $(".three-houses").addClass("hidden");
    $(".four-houses").addClass("hidden");
    $(".hotel").addClass("hidden");
    $(".houses-cost").addClass("hidden");
  }

  var modal = $(".property-modal");
  modal.fadeIn(350, function(event) {
    $(document).click(function(event) {
      if (!$(event.target).closest(".tile").length) {
        modal.fadeOut(350);
      };
    });
  });
};

MonopolyTableView.prototype.updatePlayerModule = function(players) {
  $(".player-box").empty();
  $(".player-box").append('<h2> Players </h2>');
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var div = document.createElement("div");
    div.className = "player-info";
    div.innerHTML = player.name + ": $" + player.money;
    div.id = i;
    var propertyContainer = document.createElement("div");
    propertyContainer.className = "property-container";
    div.appendChild(propertyContainer);
    for (var j = 0; j < player.properties.length; j++) {
      var propDiv = document.createElement("div");
      propDiv.className = "player-property " + this.getCssClassForGroupNumber(player.properties[j].propertyGroup);
      propDiv.innerHTML = player.properties[j].name;
      propDiv.id = i + "," + j;
      propertyContainer.appendChild(propDiv);
    }
    $(".player-box").append(div);
  }

  var context = this;

  $(".player-info").click(function(event) {
    var id = $(event.currentTarget).attr("id");
    var player = players[id];
    context.game.addPlayerToTrade(player);
    context.refreshView();
  });

  $(".player-property").click(function(event) {
    var id = $(event.currentTarget).attr("id");
    var split = id.split(",");
    var playerIndex = split[0];
    var propertyIndex = split[1];
    var player = players[playerIndex];
    var property = player.properties[propertyIndex];
    context.game.addPropertyToTrade(property);
    event.stopPropagation();
    context.refreshView();
  });

};

MonopolyTableView.prototype.subscribeSoundModule = function() {
  var context = this;
  this.game.subscribe( function(message) {
    if (message.type == "play sound") {
      context.playSound(message);
    }
  });
};

MonopolyTableView.prototype.playSound = function(msg) {
  this.getSoundForToken(msg.text).play();
};

MonopolyTableView.prototype.getSoundForToken = function(token) {
  switch(token.cssClass) {
    case "dog":
      return new Audio('/assets/sounds/dog.wav');
    case "hat":
      return new Audio('/assets/sounds/hat.wav');
    case "battleship":
      return new Audio('/assets/sounds/battleship.wav');
    case "thimble":
      return new Audio('/assets/sounds/thimble.wav');
    case "wheelbarrow":
      return new Audio('/assets/sounds/wheelbarrow.wav');
    case "shoe":
      return new Audio('/assets/sounds/shoe.wav');
    case "iron":
      return new Audio('/assets/sounds/iron.mp3');
    case "racecar":
      return new Audio('/assets/sounds/car.wav');
    default:
      return null;
  }
}

MonopolyTableView.prototype.showCard = function(message, cardType) {
    var cardDiv = $("<div/>", {
        class: 'card ' + cardType,
        text: message
    });

    cardDiv.appendTo('.board')
    cardDiv.fadeIn(350, function(event) {
      $(document).click(function(event) {
        if (!$(event.target).closest("." + cardType + ".card").length) {
          cardDiv.fadeOut(350, function() {
            cardDiv.remove();
          });
        };
      });
    });
};

MonopolyTableView.prototype.getCssClassForGroupNumber = function(num) {
  switch(num) {
    case 0:
      return "brown-group";
    case 1:
      return "light-blue-group";
    case 2:
      return "magenta-group";
    case 3:
      return "orange-group";
    case 4:
      return "red-group";
    case 5:
      return "yellow-group";
    case 6:
      return "green-group";
    case 7:
      return "blue-group";
    default:
      return "other-group";
  }
}

module.exports = MonopolyTableView;
