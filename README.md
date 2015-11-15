# TableTop.JS

## TableTop.JS will be designed to embody the following principles:

* Oriented toward new developers
* Rapidly publishable
* Flexible but simple
* Well-documented and testable
* Advanced features for veteran developers

## How to setup environment

* Download npm `brew install npm`
* Download webpack `npm install -g webpack`
* npm install (needed whenever there's an update to node modules) `npm install`
* Compile JS `npm run webpack`
* To run the tests `npm run test`

## How to use TableTop.JS

### Setup a new project

Take a look at some of our example projects to get a feel for how they're setup. You can view all of our examples as well as our documentation [here] (andrewjmeier.github.io/TableTop.JS) or you can check out [Monopoly](github.com/andrewjmeier/Monopoly) or [Settlers of Catan](github.com/andrewjmeier/Settlers). 

#### If you're new to JavaScript and npm, try using our [TableTopSkeleton](github.com/andrewjmeier/TableTopSkeleton) to get started. 

* Click on `Fork` on the top right of the page. This will create a new repository for you to create your boardgame. 
* Next find the link on the right side of the page under `HTTPS clone URL`. Copy this link
* Open up the `Terminal` application on your computer and enter `git clone` followed by the URL from above that you copied.
* `Press Enter`. This will download the project to your computer and setup git which is a version control system. You can learn all about git from [github](https://try.github.io/levels/1/challenges/1). 
* Then enter `cd TableTopSkeleton`
* Followed by `npm install`. This will download some external dependencies for your project (including the TableTop framework)
* Open the package.json file to customize the project for your boardgame (you can enter `open .` in the terminal to show the folder in Finder)
* You'll want to edit a bunch of lines in this file: 
  * Add the name of your game `"name": "your-game-name-here"`  
  * Update the description of your game `"description": "A board game using TableTop.JS"`
  * Add the link to your github repository ```"repository": {
    "type": "git",
    "url": "git+https://github.com/your-github-user-name/your-project-name.git"
  }```
  * Add yourself as the author of the project `"author": "FirstName LastName <youremail@email.com>"`
  * Add your github repo's issues page ```"bugs": {
    "url": "https://github.com/your-github-user-name/your-project-name/issues"
  }```
  * Change the homepage `"homepage": "https://github.com/your-github-user-name/your-project-name#readme"`
* Add your code in the `/src` directory
* Enter `npm run webpack` in the Terminal
* You're all set! Open the `index.html` file and check out your game!

#### If npm is nothing new to you, just use `npm install tabletop-boardgames` to get started! 