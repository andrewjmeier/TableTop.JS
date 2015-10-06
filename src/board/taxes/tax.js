function Tax() { 
  this.taxAmount = 0; // give default value of 0, should be overridden 
}
Tax.prototype = Object.create(Space.prototype);
Tax.prototype.performLandingAction = function(player) { 
  // should probably refactor this into a fn
  // that checks balance, prompts player to mortage/sell
  // before declaring him bankrupt
  this.player.money -= this.taxAmount;
}; 
