var TableTop = require('../../../tabletop/tabletop');
var $ = require("jquery");

function MonopolyTableView(game, turnMap) {
  TableTop.TableView.call(this, game, turnMap);
  this.subscribeMessageModule();

  this.subscribeSoundModule();
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