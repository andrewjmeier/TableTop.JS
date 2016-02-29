var TableTop = require('../../../tabletop/tabletop');
var $ = require("jquery");

function MonopolyTableView(game, turnMap) {
  TableTop.TableView.call(this, game, turnMap);
  this.subscribeMessageModule();

  var context = this;
  
  this.game.subscribe( function(message) {
    if (message.type == "show chance") {
      context.showCard(message.text, "chance");
    }

    if (message.type == "show community chest") {
      context.showCard(message.text, "community-chest");
    }
  });
};

inherits(MonopolyTableView, TableTop.TableView);

MonopolyTableView.prototype.updatePlayerModule = function(players) {
  $(".player-box").empty();
  $(".player-box").append('<h2> Players </h2>');
  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    var div = document.createElement("div");
    div.className = "player-info";
    div.innerHTML = player.name + ": $" + player.money;
    var propertyContainer = document.createElement("div");
    propertyContainer.className = "property-container";
    div.appendChild(propertyContainer);
    for (var j = 0; j < player.properties.length; j++) {
      var propDiv = document.createElement("div");
      propDiv.className = "player-property " + this.getCssClassForGroupNumber(player.properties[j].propertyGroup);
      propDiv.innerHTML = player.properties[j].name;
      propertyContainer.appendChild(propDiv);
    }
    $(".player-box").append(div);
  }
};

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