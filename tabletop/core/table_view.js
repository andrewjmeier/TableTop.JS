var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;

    this.refreshView();

    var context = this;

    var getPlayerName = function() {
        return $(".player-name").val();
    }

    $(".game").click( function() {
        context.game.updateState("yes_continue");
    });

    $(".join-game").click(function() {
        var id = $(".joingame-id").val();
        var name = getPlayerName();
        context.game.joinGame(id, name);
    });

    $(".new-game").click(function() {
        var name = getPlayerName();
        context.game.createGame(name);
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
        if (message.type == "set buttons") {
            context.refreshButtons(message);
        }
    });
};

TableView.prototype.refreshButtons = function(msg) {
    var buttons = msg.text;
    var container = $(".controls");
    container.empty();
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];

        var div = $("<div/>", {
                    class: 'button game ' + button.id,
                    text: button.text
            });
        container.append(div);
        var selectedDiv = $(".button.game." + button.id);
        var context = this;
        selectedDiv.click( context.buttonClicked( button ));
    }

};

TableView.prototype.buttonClicked = function(button) {
    return function() {
        button.onClick();
    }
};

TableView.prototype.refreshView = function() {
    $(".token").remove();

    for (var i = 0; i < this.game.board.tiles.length; i++) {
        var tile = this.game.board.getTile(i);
        for (var j = 0; j < tile.tokens.length; j++) {
            this.addTokenToTile(tile.tokens[j], i);
        }
    }

    if(this.game.clientPlayerID !== 0) {
        $(".start-game").addClass("hidden");
    } else {
        $(".start-game").removeClass("hidden");
    }

    $(".gamecode").html("Game Code: " + this.game.gameID);
    this.updatePlayerModule(this.game.players);

    // scroll messenger to the bottom
    $(".messenger").scrollTop($(".messenger")[0].scrollHeight);

    // if the game has dice, draw them 
    var dice = this.game.dice;

    for (var i = 0; i < dice.length; i++) {
        var die = dice[i];
        var id = "#die-" + (i + 1);
        var div = $(id);
        div.removeClass();
        div.addClass("die " + this.getClassForDie(die));
    }

};

TableView.prototype.getClassForDie = function(die) {
    switch(die) {
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        default:
            return "";
    }
};


TableView.prototype.updatePlayerModule = function(players) {

};

TableView.prototype.addTokenToTile = function(token, tile_idx) {
    $("<div/>", {
        id: token.id,
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
