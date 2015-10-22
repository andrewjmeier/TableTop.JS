should = require('chai').should(),
ChanceDeck = require('../../../src/monopoly/cards/chanceDeck'),
Player = require('../../../src/monopoly/monopoly_player');
Game = require('../../../src/monopoly/monopoly_game');
Board = require('../../../src/monopoly/board_utils');

describe('chance cards', function() {
  var cards;
  var player;
  before(function() {
    var chanceDeck = new ChanceDeck();
    cards = chanceDeck.cards;
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

  describe('#advance to illinois ave', function() {
    it('moves position to 24', function() {
      cards[1].action(game);
      player.position.should.eql(24);
    });
  });

  describe('#advance token to the nearest utility', function() {
    it('moves to water works', function() {
      player.position = 15;
      cards[2].action(game);
      player.position.should.eql(28);
    });

    it('moves to electric company', function() {
      player.position = 30;
      cards[2].action(game);
      player.position.should.eql(12);
    });
  });

  describe('#advance to nearest railroad', function() {
    it('move to reading w/out passing go', function() {
      player.position = 1;
      cards[3].action(game);
      player.position.should.eql(5);
      player.money.should.eql(500);
    });

    it('move to reading passing go', function() {
      player.position = 39;
      cards[3].action(game);
      player.position.should.eql(5);
      player.money.should.eql(700);
    });

    it('move to Penn', function() {
      player.position = 7;
      cards[3].action(game);
      player.position.should.eql(15);
    });

    it('move to B & O', function() {
      player.position = 17;
      cards[3].action(game);
      player.position.should.eql(25);
    });

    it('move to short line', function() {
      player.position = 27;
      cards[3].action(game);
      player.position.should.eql(35);
    });
  });

  describe('#advance to st charles place', function() {
    it('moves position to 11', function() {
      cards[5].action(game);
      player.position.should.eql(11);
    });
  });

  describe('#bank pays dividend $50', function() {
    it('increase money by 50', function() {
      cards[6].action(game);
      player.money.should.eql(550);
    });
  });

  describe('#get out of jail free', function() {
    it('adds a get out of jail free card', function() {
      cards[7].action(game);
      player.getOutOfJailFreeCards.should.eql(1);
    });
  });

  describe('#Go back 3 spaces', function() {
    it('moves player back 3 spaces', function() {
      player.position = 6;
      cards[8].action(game);
      player.position.should.eql(3);
    });

    it('moves player back 3 spaces past go', function() {
      player.position = 1;
      cards[8].action(game);
      player.position.should.eql(38);
    });
  });

  describe('#go directly to jail', function() {
    it('puts the player in jail', function() {
      cards[9].action(game);
      player.inJail.should.eql(true);
      player.position.should.eql(10);
    });
  });

  // TODO
  // describe('#make general repairs on your properties', function() {
  //   it('adds a get out of jail free card', function() {
  //     cards[10].action(player);
  //   });
  // });

  describe('#pay poor tax of $15', function() {
    it('deducts $15 from the player', function() {
      cards[11].action(game);
      player.money.should.eql(485);
    });
  });

  describe('#Take a trip of the reading', function() {
    it('moves player to Reading RR', function() {
      cards[12].action(game);
      player.position.should.eql(5);
    });
  });

  describe('#Take a walk on the boardwalk', function() {
    it('Moves player to boardwalk', function() {
      cards[13].action(game);
      player.position.should.eql(39);
    });
  });

  describe('#elected chairman of the board', function() {
    it('pay each player $50', function() {
      cards[14].action(game);
      player.money.should.eql(400);
      player2.money.should.eql(550);
      player3.money.should.eql(550);
    });
  });

  describe('#Building loan matures', function() {
    it('adds $150 to player', function() {
      cards[15].action(game);
      player.money.should.eql(650);
    });
  });

  describe('#won crossword competition', function() {
    it('collect $100', function() {
      cards[16].action(game);
      player.money.should.eql(600);
    });
  });

});
