should = require('chai').should(),
    Utils = require('../src/utils'),
Player = require('../src/player');

describe('chance cards', function() {
  var cards;
  var player;
  before(function() {
    cards = Utils.buildChanceDeck();
  });

  beforeEach(function() {
    player = new Player("John");
    player.moveTo(33);
  });

  describe('#Advance to Go (Collect $200)', function() {
    it('moves position to zero', function() {
      cards[0].action(player);
      player.position.should.eql(0);
    });
  });

  describe('#advance to illinois ave', function() {
    it('moves position to 24', function() {
      cards[1].action(player);
      player.position.should.eql(24);
    });
  });

  describe('#advance token to the nearest utility', function() {
    it('moves to water works', function() {
      player.position = 15;
      cards[2].action(player);
      player.position.should.eql(28);
    });

    it('moves to electric company', function() {
      player.position = 30;
      cards[2].action(player);
      player.position.should.eql(12);
    });
  });

  describe('#advance to nearest railroad', function() {
    it('move to reading w/out passing go', function() {
      player.position = 1;
      cards[3].action(player);
      player.position.should.eql(5);
      player.money.should.eql(500);
    });

    it('move to reading passing go', function() {
      player.position = 39;
      cards[3].action(player);
      player.position.should.eql(5);
      player.money.should.eql(700);
    });

    it('move to Penn', function() {
      player.position = 7;
      cards[3].action(player);
      player.position.should.eql(15);
    });

    it('move to B & O', function() {
      player.position = 17;
      cards[3].action(player);
      player.position.should.eql(25);
    });

    it('move to short line', function() {
      player.position = 27;
      cards[3].action(player);
      player.position.should.eql(35);
    });
  });

  describe('#advance to st charles place', function() {
    it('moves position to 11', function() {
      cards[5].action(player);
      player.position.should.eql(11);
    });
  });

  describe('#bank pays dividend $50', function() {
    it('increase money by 50', function() {
      cards[6].action(player);
      player.money.should.eql(550);
    });
  });

  describe('#get out of jail free', function() {
    it('adds a get out of jail free card', function() {
      cards[7].action(player);
      player.getOutOfJailFreeCards.should.eql(1);
    });
  });

  describe('#Go back 3 spaces', function() {
    it('moves player back 3 spaces', function() {
      player.position = 5;
      cards[8].action(player);
      player.position.should.eql(2);
    });

    it('moves player back 3 spaces past go', function() {
      player.position = 1;
      cards[8].action(player);
      player.position.should.eql(38);
    });
  });

  describe('#go directly to jail', function() {
    it('puts the player in jail', function() {
      cards[9].action(player);
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
      cards[11].action(player);
      player.money.should.eql(485);
    });
  });

  describe('#Take a trip of the reading', function() {
    it('moves player to Reading RR', function() {
      cards[12].action(player);
      player.position.should.eql(5);
    });
  });

  describe('#Take a walk on the boardwalk', function() {
    it('Moves player to boardwalk', function() {
      cards[13].action(player);
      player.position.should.eql(39);
    });
  });

  // TODO
  // describe('#elected chairman of the board', function() {
  //   it('pay each player $50', function() {
  //     cards[14].action(player);
  //   });
  // });

  describe('#Building loan matures', function() {
    it('adds $150 to player', function() {
      cards[15].action(player);
      player.money.should.eql(650);
    });
  });

  describe('#won crossword competition', function() {
    it('collect $100', function() {
      cards[16].action(player);
      player.money.should.eql(600);
    });
  });

});

describe('community chest cards', function() {
  var cards;
  var player;
  before(function() {
    cards = Utils.buildCommunityChestDeck();
  });

  beforeEach(function() {
    player = new Player("John");
    player.moveTo(33);
  });

  describe('#Advance to Go (Collect $200)', function() {
    it('moves position to zero', function() {
      cards[0].action(player);
      player.position.should.eql(0);
    });
  });

  describe('#bank error', function() {
    it('collect $75', function() {
      cards[1].action(player);
      player.money.should.eql(575);
    });
  });

  describe('#doctors fee', function() {
    it('pay $50', function() {
      cards[2].action(player);
      player.money.should.eql(450);
    });
  });

  describe('#get out of jail free', function() {
    it('adds a get out of jail free card', function() {
      cards[3].action(player);
      player.getOutOfJailFreeCards.should.eql(1);
    });
  });

  describe('#go directly to jail', function() {
    it('puts the player in jail', function() {
      cards[4].action(player);
      player.inJail.should.eql(true);
      player.position.should.eql(10);
    });
  });

  // TODO
  // describe('#birthday', function() {
  //   it('collect $10 from each player', function() {
  //     cards[5].action(player);
  //     player.money.should.eql(575);
  //   });
  // });

  // TODO
  // describe('#opera night', function() {
  //   it('collect $50 from each player', function() {
  //     cards[6].action(player);
  //     player.money.should.eql(575);
  //   });
  // });

  describe('#income tax refund', function() {
    it('collect $20', function() {
      cards[7].action(player);
      player.money.should.eql(520);
    });
  });

  describe('#life insurance', function() {
    it('collect $100', function() {
      cards[8].action(player);
      player.money.should.eql(600);
    });
  });

  describe('#hospital fees', function() {
    it('deducts $100 from the player', function() {
      cards[9].action(player);
      player.money.should.eql(400);
    });
  });

  describe('#school fees', function() {
    it('deducts $50 from the player', function() {
      cards[10].action(player);
      player.money.should.eql(450);
    });
  });

  describe('#consultancy fee', function() {
    it('collect $25', function() {
      cards[11].action(player);
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
      cards[13].action(player);
      player.money.should.eql(510);
    });
  });

  describe('#inherit 100', function() {
    it('collect $100', function() {
      cards[14].action(player);
      player.money.should.eql(600);
    });
  });

  describe('#sale of stock', function() {
    it('collect $50', function() {
      cards[15].action(player);
      player.money.should.eql(550);
    });
  });

  describe('#holiday fund matures', function() {
    it('collect $100', function() {
      cards[16].action(player);
      player.money.should.eql(600);
    });
  });
});