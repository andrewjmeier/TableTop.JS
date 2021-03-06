## Windows TableTop.js Setup Instructions
​
* Download [GitHub Desktop](https://desktop.github.com/). This will automatically install GitHub and Git Shell. ![](/tutorials/images/windows/github.png)
​
* Go to [nodejs.org](https://nodejs.org/en/) and download Node.js ![](/tutorials/images/windows/node.png)
​
* Run the .msi file to install Node.js
​
* Restart your PC as you cannot run Node.js without restarting your PC
​
* Open Git Shell and type “node -v” to check whether Node has been
    successfully installed
​
* In Git Shell, type “npm -v” to check whether NPM has been successfully installed ![](/tutorials/images/windows/check_node_npm.png)
​
* Now, download [XAMPP](https://www.apachefriends.org/download.html).   
![](/tutorials/images/windows/xampp.png)
​
* Install Xampp. When you install, uncheck everything as all we need is Apache ![](/tutorials/images/windows/install_xampp.png)
​
* After installing Xampp, run Xampp Control Panel and click “start” button for Apache. ![](/tutorials/images/windows/run_xampp.png)
​
* If there is a port problem, change port number to 4433 & 8080
​
* Now, go to the [TableTopSkeleton](https://github.com/andrewjmeier/TableTopSkeleton)
​
* Click on “Fork” on the top right of the page. This will create a new repository for you to create your board game. ![](/tutorials/images/how-to-fork.png)
​
* Next find the link on the right side of the page under HTTPS clone URL. Copy this link. ![](/tutorials/images/how-to-clone.png)
​
* Open up Git Shell and move to C:\\xampp\\htdocs
​
* Type “cd ..” into Git Shell until you move all the way up to C:\\ ![](/tutorials/images/windows/cd.png)
​
* Enter “cd xampp” and “cd htdocs” to get into C:\\xampp\\htdocs folder ![](/tutorials/images/windows/cd_xampp_htdocs.png)
​
* enter “git clone” followed by the URL from above that you copied. ![](/tutorials/images/windows/run_git_clone.png)
​
* Type “npm install -g webpack”
​
* Type “npm install”