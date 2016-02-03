var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;

    this.refreshView();

    var context = this;

    $(".myButton").click( function() {
        context.game.updateState("yes_continue");
    });

    this.game.subscribe( function(message) {
        console.log("hello");
        if (message == "refreshView") {
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
};

TableView.prototype.addTokenToTile = function(token, tile_idx) {
    $("<div/>", {
        id: token.uniqueId,
        class: 'token ' + token.cssClass,
    }).appendTo("#tile" + tile_idx);
};

module.exports = TableView;