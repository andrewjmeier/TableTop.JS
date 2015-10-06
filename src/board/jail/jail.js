function Jail() {}
GoToJail.prototype = Object.create(Space.prototype);
GoToJail.prototype.performLandingAction = function(player) { 
  //  player.go_to_jail(); todo: make this fn in player
}; 
