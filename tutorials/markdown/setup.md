## Using [TableTopSkeleton](http://github.com/andrewjmeier/TableTopSkeleton) to get started. 

If you're using Windows, you'll need to check out our [Windows Setup Instructions](./windows_setup.md)

### First you'll want to go to the [TableTopSkeleton](http://github.com/andrewjmeier/TableTopSkeleton) page: http://github.com/andrewjmeier/TableTopSkeleton

1. Click on `Fork` on the top right of the page. This will create a new repository for you to create your board game. ![Fork Image](/tutorials/images/how-to-fork.png)
2. Next find the link on the right side of the page under `HTTPS clone URL`. Copy this link ![Clone URL](/tutorials/images/how-to-clone.png)
3. Open up the `Terminal` application on your computer and paste `cd ~/Documents/`. Press Enter.
4. Next enter `git clone` followed by the URL from above that you copied. ![clone image](/tutorials/images/git-clone.png)
5. `Press Enter`. This will download the project to your computer and setup git which is a version control system. You can learn all about git from [github](https://try.github.io/levels/1/challenges/1). 
6. Then enter `cd TableTopSkeleton`. This will switch your current directory from Documents to TableTopSkeleton which you just downloaded. 
7. Now that we have the skeleton project downloaded, there are a few more things that we need to setup. 
8. To start, you'll need to have Homebrew installed on your computer. Homebrew is a great tool for managing different software packages. You can ready about it [here](http://brew.sh) but it's not crucial that you understand what it's doing. We just need it to install some other software.
9. To install Homebrew enter `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` into the terminal window and press enter.
10. Now that that's done, we can install [npm](https://www.npmjs.com) using Homebrew. Enter `brew install npm` into the terminal. ![brew npm](/tutorials/images/brew-npm.png)
11. Using npm, we'll install webpack which is a tool that compiles JavaScript together. Enter `npm install -g webpack`. ![webpack-install](/tutorials/images/npm-webpack.png) 
12. Now enter `npm install`. This will download some external dependencies for your project (including the TableTop framework) ![npm install](/tutorials/images/npm-install.png)
13. Open the `package.json` file to customize the project for your board game (you can enter `open .` in the terminal to show the folder in Finder)
14. You'll want to edit a bunch of lines in this file: 
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
15. Add your code in the `/src` directory
16. To compile your code, enter `npm run webpack` in the Terminal. This command takes all of the different JavaScript files and combines them into a single file to use on the webpage. The HTML file `index.html` has been setup to look for the compiled JavaScript file and that's how your game will run. Webpack will continue to rebuild your project automatically every time you save a new file. If you want to stop executing it, you can enter control-c `^c` in the terminal. ![running webpack](/tutorials/images/npm-run-webpack.png)
17. You're all set! Open the `index.html` file and check out your game!
