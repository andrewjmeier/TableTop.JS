# Ok, But How do I JavaScript?

We won't go into all of the details of JavaScript (you can use the [internet](https://en.wikipedia.org/wiki/Internet), [Stack Overflow](http://stackoverflow.com), or [Google](http://google.com) for that). Instead, we'll just fill you in on a few things that you need to understand in order to fully use our framework.

## Classes, Objects, and Inheritance

JavaScript classes have four main parts: the Constructor, Inheritance, Methods, and the Export. 

### Constructor

In the constructor we'll create the object and set up any instance variables that we may need. 

```
function GridBoard(width, height) { 
  Board.call(this);
  for (var i = 0; i < width; i++) { 
    this.tiles[i] = Array(this.height);
  }

  this.width = width;
  this.height = height;
};
```

In this example we have `Board.call(this)` which is a call to the super class' constructor. In JavaScript `this` refers to the current object (you might be familiar with using `self` from another language). If you need to pass parameters to the super class, you can include those as well `Board.call(this, a, b)`. 

### Inheritance

It's not enough to simply call the super class from our constructor. We must also state that our new class inherits from the super class. 

```
var inherits = require('util').inherits;
var Board = require("./board.js");

function GridBoard(width, height) {
    ...
}

inherits(GridBoard, Board);
```

To do that, we'll need to require (just like an import) the inherits method from util and the super class. Then we just call the inherits method.

### Methods

Adding methods to a class in JavaScript is just like any other language, except that the notation is slightly different. 

```
GridBoard.prototype.getTile = function(x, y) { 
  return this.tiles[x][y];
};
```

It's very straight forward, here we simply have a method that takes two parameters, x and y, and returns the element in those indices in the array.

### Export

Lastly, we need to export our object. This allows us to use the `require` statement that you saw earlier to use the object in another file. 

```
module.exports = GridBoard;
```