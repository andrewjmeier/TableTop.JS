var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;

    this.refreshView();

    var context = this;

    $(".game-button").click( function() {
        context.game.updateState("yes_continue");
    });

    $(".joingame-button").click(function() {
        var id = $(".joingame-id").val();
        console.log("joining", id);
        context.game.joinGame(id);
    });

    $(".newgame-button").click(function() {
        console.log("creating new game");
        context.game.createGame();
    });

    this.game.subscribe( function(message) {
        if (message.type == "view") {
            context.refreshView();
        }
    });
}

TableView.prototype.refreshView = function() {
    $(".token").remove();

    for (var i = 0; i < this.game.board.tiles.length; i++) {
        var tile = this.game.board.getTile(i);
        for (var j = 0; j < tile.tokens.length; j++) {
            this.addTokenToTile(tile.tokens[j], i);
        }
    }

    $(".gamecode").html("Game Code: " + this.game.gameID);
    this.updatePlayerModule(this.game.players);
};


TableView.prototype.updatePlayerModule = function(players) {

};

TableView.prototype.addTokenToTile = function(token, tile_idx) {
    $("<div/>", {
        id: token.uniqueId,
        class: 'token ' + token.cssClass,
    }).appendTo("#tile" + tile_idx);
};

TableView.prototype.subscribeMessageModule = function() {
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
module.exports = TableView;