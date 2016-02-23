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
    div.innerHTML = player.name + ": $" + player.money;
    for (var j = 0; j < player.properties.length; j++) {
      var propDiv = document.createElement("div");
      propDiv.innerHTML = player.properties[j].name;
      div.appendChild(propDiv);
    }
    $(".player-box").append(div);
  }
};

module.exports = MonopolyTableView;