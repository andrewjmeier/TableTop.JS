var $ = require("jquery");

function GridView(game, turnMap) {
  console.log("this");
  this.game = game;

  this.refreshView();

  var context = this;

  $(".button").click(function() {
    console.log("here");
    var p1 = $(".player1-name").val();
    var p2 = $(".player2-name").val();
    context.game.startGame(p1, p2);
  });

  $(".tile").click(function(event) {
    var tileID = $(event.currentTarget).attr("id");
    var id = tileID.substring(4,6);
    var x = id % 8;
    var y = Math.floor(id / 8);
    var tile = context.game.board.getTile(x, y);
    context.game.tileClicked(tile);
  });

  $(".token").click(function(event) {
    var tile = $(event.currentTarget).parent();
    var tileID = tile.attr("id");
    var id = tileID.substring(4,6);
    var x = id % 8;
    var y = Math.floor(id / 8);
    var tile = context.game.board.getTile(x, y);
    var token = tile.tokens[0];
    context.game.tokenClicked(token);
    event.stopPropagation();
  });

  this.game.subscribe( function(message) {
    if (message.type == "view") {
      context.refreshView();
    }
  });
}

GridView.prototype.refreshView = function() {
  $(".token").remove();

  for (var y = 0; y < this.game.board.tiles[0].length; y++) {
    for (var x = 0; x < this.game.board.tiles.length; x++) {
      var tile = this.game.board.getTile(x, y);
      
      for (var j = 0; j < tile.tokens.length; j++) {
        var i = (y * 8 + x);
        this.addTokenToTile(tile.tokens[j], i);
      }
    }
  }
};

GridView.prototype.addTokenToTile = function(token, tile_idx) {
  var tile = $("#tile" + tile_idx);
  tile.prepend($("<div/>", {
    id: token.id,
    class: 'token ' + token.cssClass,
  }));
};

GridView.prototype.subscribeMessageModule = function() {
  var context = this;

  this.game.subscribe( function(message) {
    if (message.type == "standard") {
      $("<div/>", {
        class: 'message' + message.cssClass,
        text: message.text
      }).appendTo(".game-messages");
    }
  })
};
module.exports = GridView;