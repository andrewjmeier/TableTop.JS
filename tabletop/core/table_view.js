var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;

    this.refreshView();

    var context = this;

    $(".control-button").click( function() {
        context.game.updateState("yes_continue");
    });

    this.game.subscribe( function(message) {
        if (message.type == "view") {
            context.refreshView();
        }
    });

    $(".tile").click( function(event) {
        $(".chance.card").fadeIn(350);
    });

    $(document).click(function(event) {
        if (!$(event.target).closest(".chance.card").length && !$(event.target).is(".overlay")) {
            if($(".chance.card").is(":visible")) {
                $(".chance.card").fadeOut(350);
            };
        };
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