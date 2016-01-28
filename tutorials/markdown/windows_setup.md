## Windows TableTop.js Setup Instructions
​
(1) Download [GitHub Desktop](https://desktop.github.com/). This will
    automatically install GitHub and Git Shell.
​
![](/tutorials/images/windows/github.png)
​
(1) Go to [nodejs.org](https://nodejs.org/en/) and download Node.js
​
![](/tutorials/images/windows/node.png)
​
(1) Run the .msi file to install Node.js
​
(2) Restart your PC as you cannot run Node.js without restarting your PC
​
(3) Open Git Shell and type “node -v” to check whether Node has been
    successfully installed
​
(4) In Git Shell, type “npm -v” to check whether NPM has been
    successfully installed
​
![](/tutorials/images/windows/check_node_npm.png)
​
(1) Now, download [XAMPP](https://www.apachefriends.org/download.html).
​
![](/tutorials/images/windows/xampp.png)
​
(1) Install Xampp. When you install, uncheck everything as all we need
    is Apache
​
![](/tutorials/images/windows/install_xampp.png)
​
(1) After installing Xampp, run Xampp Control Panel and click “start”
    button for Apache.
​
![](/tutorials/images/windows/run_xampp.png)
​
(1) If there is a port problem, change port number to 4433 & 8080
​
(2) Now, go to the [TableTopSkeleton](https://github.com/andrewjmeier/TableTopSkeleton)
​
(3) Click on “Fork” on the top right of the page. This will create a new
    repository for you to create your board game.
​
![](/tutorials/images/how-to-fork.png)
​
(1) Next find the link on the right side of the page under HTTPS
    clone URL. Copy this link 
​
![](/tutorials/images/how-to-clone.png)
​
(1) Open up Git Shell and move to C:\\xampp\\htdocs
​
(2) Type “cd ..” into Git Shell until you move all the way up to C:\\
​
![](/tutorials/images/windows/cd.png)
​
(1) Enter “cd xampp” and “cd htdocs” to get into C:\\xampp\\htdocs
    folder
​
![](/tutorials/images/windows/cd_xampp_htdocs.png)
​
(1) enter “git clone” followed by the URL from above that you copied.
​
![](/tutorials/images/windows/run_git_clone.png)
​
(1) Type “npm install -g webpack”
​
(2) Type “npm install”