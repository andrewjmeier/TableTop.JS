function IncomeTax() {
  this.taxAmount = 200; // flat tax - will give user option later
}
IncomeTax.prototype = Object.create(Tax.prototype);
IncomeTax.prototype.performLandingAction = function(player) { 
  // todo: prompt user for choice here
  // if (userWantsFlatTax) this.taxAmount = 200; 
  // else this.taxAmount = playerAssetValue(player)*.10;
}; 
