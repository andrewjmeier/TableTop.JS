var TableTop = require('../../../tabletop/tabletop');
var $ = require("jquery");

function MonopolyTableView(game, turnMap) {
  TableTop.TableView.call(this, game, turnMap);
  this.subscribeMessageModule();
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
    var br = document.createElement("br");
    div.appendChild(br);
    for (var j = 0; j < player.properties.length; j++) {
      var propDiv = document.createElement("div");
      propDiv.className = "player-property " + this.getCssClassForGroupNumber(player.properties[j].propertyGroup);
      propDiv.innerHTML = player.properties[j].name;
      div.appendChild(propDiv);
    }
    $(".player-box").append(div);
  }
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
      return "";
  }
}

module.exports = MonopolyTableView;