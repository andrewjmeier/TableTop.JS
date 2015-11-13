should = require('chai').should(),
CommunityChestDeck = require('../../../src/monopoly/cards/communityChestDeck'),
Player = require('../../../src/monopoly/monopoly_player');
Game = require('../../../src/monopoly/monopoly_game');
Board = require('../../../src/monopoly/board_utils');

describe('community chest cards', function() {
  var cards;
  var player;
  before(function() {
    var communityChestDeck = new CommunityChestDeck();
    cards = communityChestDeck.cards;
  });

  beforeEach(function() {
    player = new Player("John");
    player2 = new Player("smith");
    player3 = new Player("sam");
    board = new Board();
    game = new Game([player, player2, player3], board);
    game.currentPlayer = 0;
    player.moveTo(33);
    player.money = 500;
    player2.money = 500;
    player3.money = 500;
  });

  describe('#Advance to Go (Collect $200)', function() {
    it('moves position to zero', function() {
      cards[0].action(game);
      player.position.should.eql(0);
    });
  });

  describe('#bank error', function() {
    it('collect $75', function() {
      cards[1].action(game);
      player.money.should.eql(575);
    });
  });

  describe('#doctors fee', function() {
    it('pay $50', function() {
      cards[2].action(game);
      player.money.should.eql(450);
    });
  });

  describe('#get out of jail free', function() {
    it('adds a get out of jail free card', function() {
      cards[3].action(game);
      player.getOutOfJailFreeCards.should.eql(1);
    });
  });

  describe('#go directly to jail', function() {
    it('puts the player in jail', function() {
      cards[4].action(game);
      player.inJail.should.eql(true);
      player.position.should.eql(10);
    });
  });

  describe('#birthday', function() {
    it('collect $10 from each player', function() {
      cards[5].action(game);
      player.money.should.eql(520);
      player2.money.should.eql(490);
      player3.money.should.eql(490);
    });
  });

  describe('#opera night', function() {
    it('collect $50 from each player', function() {
      cards[6].action(game);
      player.money.should.eql(600);
      player2.money.should.eql(450);
      player3.money.should.eql(450);
    });
  });

  describe('#income tax refund', function() {
    it('collect $20', function() {
      cards[7].action(game);
      player.money.should.eql(520);
    });
  });

  describe('#life insurance', function() {
    it('collect $100', function() {
      cards[8].action(game);
      player.money.should.eql(600);
    });
  });

  describe('#hospital fees', function() {
    it('deducts $100 from the player', function() {
      cards[9].action(game);
      player.money.should.eql(400);
    });
  });

  describe('#school fees', function() {
    it('deducts $50 from the player', function() {
      cards[10].action(game);
      player.money.should.eql(450);
    });
  });

  describe('#consultancy fee', function() {
    it('collect $25', function() {
      cards[11].action(game);
      player.money.should.eql(525);
    });
  });

  // TODO
  // describe('#street repairs', function() {
  //   it('pay for each house and hotel', function() {
  //     cards[12].action(player);
  //     player.money.should.eql(600);
  //   });
  // });

  describe('#beauty contest', function() {
    it('collect $10', function() {
      cards[13].action(game);
      player.money.should.eql(510);
    });
  });

  describe('#inherit 100', function() {
    it('collect $100', function() {
      cards[14].action(game);
      player.money.should.eql(600);
    });
  });

  describe('#sale of stock', function() {
    it('collect $50', function() {
      cards[15].action(game);
      player.money.should.eql(550);
    });
  });

  describe('#holiday fund matures', function() {
    it('collect $100', function() {
      cards[16].action(game);
      player.money.should.eql(600);
    });
  });
});
