function Space(name) { 
  this.name = name; 
  this.occupier = null;
}
// every space needs a landing action
Space.prototype.performLandingAction = function(){
  console.log("You landed on " + this.name);
}; 

module.exports = Space;
