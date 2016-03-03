var $ = require("jquery");

function GridView(game, turnMap) {
  this.game = game;

  this.refreshView();

  var context = this;

  var getPlayerName = function() {
      return $(".player-name").val();
  }

  $(".show-join-game").click(function() {
      $(".game-start.init-modal").fadeOut(200, function(event) {
          $(".join-start.init-modal").fadeIn(200);
      }); 
  });

  $(".show-new-game").click(function() {
      $(".game-start.init-modal").fadeOut(200, function(event) {
          $(".create-start.init-modal").fadeIn(200);
      }); 
  });

  $(".join-game").click(function() {
      var id = $(".joingame-id").val();
      var name = getPlayerName();
      context.game.joinGame(id, name);
      $(".join-start.init-modal").fadeOut(200, function(event) {
          $(".waiting-for-start.init-modal").fadeIn(200);
      }); 
  });

  $(".new-game").click(function() {
      var name = getPlayerName();
      context.game.createGame(name);
      $(".create-start.init-modal").fadeOut(200, function(event) {
          $(".created-start.init-modal").fadeIn(200);
      }); 
  });

  $(".start-game").click(function() {
      context.game.startGame();
  })

  this.game.subscribe( function(message) {
        if (message.type == "view") {
            context.refreshView();
        }
    });

    this.game.subscribe( function(message) {
        if (message.type == "hide start view") {
            $(".game-setup").fadeOut(350);
        }
    });


  $(".tile").click(function(event) {
    var tileID = $(event.currentTarget).attr("id");
    var id = tileID.substring(4,6);
    var x = id % 8;
    var y = Math.floor(id / 8);
    var tile = context.game.board.getTile(x, y);
    context.game.tileClicked(tile);
  });

  this.game.subscribe( function(message) {
    if (message.type == "view") {
      context.refreshView();
    }
  });
};

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

  var context = this;

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

  $(".gamecode").html("Game Code: " + this.game.gameID);

};

GridView.prototype.addTokenToTile = function(token, tile_idx) {
  var tile = $("#tile" + tile_idx);
  tile.prepend($("<div/>", {
    id: token.id,
    class: 'token ' + token.color,
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