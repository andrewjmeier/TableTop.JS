/**
 * Some Extra Utility functions for building games
*/
var Utils = {
  // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript

  /**
   * Shuffle a list
   * @param {Array} o - A list of items to be shuffled
   * @returns {Array} The shuffled list of items 
  */
  shuffle: function(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },
};

module.exports = Utils;
