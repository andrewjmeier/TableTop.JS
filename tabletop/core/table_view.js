var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;

    this.refreshView();

    var context = this;

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
        var name = $(".player-name-join").val();
        context.game.joinGame(id, name);
        $(".join-start.init-modal").fadeOut(200, function(event) {
          $(".waiting-for-start.init-modal").fadeIn(200);
      }); 
    });

    $(".new-game").click(function() {
        var name = $(".player-name-create").val();
        context.game.createGame(name);

        $(".create-start.init-modal").fadeOut(200, function(event) {
            $(".created-start.init-modal").fadeIn(200);
        }); 
    });

    $(".start-game").click(function() {
        context.game.startGame();
    });

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

    this.game.subscribe( function(message) {
        if (message.type == "hide start view") {
            $(".game-setup").fadeOut(350);
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
        // if this.game.canPlay() {

        // }
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