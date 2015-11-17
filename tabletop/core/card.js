/**
 * The Card class
 * @constructor
 * @param {string} text - The card's message
 * @param {function} action - An action to be taken when the card is drawn. action should take the game state as a parameter
*/
function Card(text, action) {
  this.text = text;
  this.action = action;
};

module.exports = Card;