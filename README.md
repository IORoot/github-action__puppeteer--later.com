
<div id="top"></div>

<div align="center">


<img src="https://svg-rewriter.sachinraja.workers.dev/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40mdi%2Fsvg%406.7.96%2Fsvg%2Finstagram.svg&fill=%23115E59&width=200px&height=200px" style="width:200px;"/>

<h3 align="center">Later.com Puppeteer Script</h3>

<p align="center">
This is a puppeteer automation script to auto-schedule Instagram, Facebook and Twitter posts through Later.com.
</p>    
</div>

##  1. <a name='TableofContents'></a>Table of Contents


* 1. [Table of Contents](#TableofContents)
* 2. [About The Project](#AboutTheProject)
	* 2.1. [Built With](#BuiltWith)
* 3. [Usage](#Usage)
	* 3.1. [Setup](#Setup)
	* 3.2. [How it works](#Howitworks)
	* 3.3. [How to use](#Howtouse)
		* 3.3.1. [post_schedule.txt](#post_schedule.txt)
		* 3.3.2. [post_footer.txt](#post_footer.txt)
		* 3.3.3. [post_videourl.txt](#post_videourl.txt)
		* 3.3.4. [post_text_XX.txt](#post_text_XX.txt)
	* 3.4. [Run](#Run)
* 4. [ Customising](#Customising)
* 5. [Troubleshooting](#Troubleshooting)
* 6. [Contributing](#Contributing)
* 7. [License](#License)
* 8. [Contact](#Contact)
* 9. [Changelog](#Changelog)


##  2. <a name='AboutTheProject'></a>About The Project


Well, Facebook & Instagram's API is a shit-show. The whole thing is just a pain.
Therefore, Later.com has a nice interface that doesn't change very often (which makes it predicatble) and easier to script. 
Also, Later.com gives the following:
- Free 30 posts per month for an entire social set.
- Free Instagram Videos (not just images)
- Free scheduling
- Their DOM is also easier to script - no random class names and obfuscation like facebook.

So, basically, this is a great service for free.



<p align="right">(<a href="#top">back to top</a>)</p>


###  2.1. <a name='BuiltWith'></a>Built With

This project was built with the following frameworks, technologies and software.

* [Github](https://github.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



##  3. <a name='Usage'></a>Usage


###  3.1. <a name='Setup'></a>Setup
You need to setup three secrets in your github repo:
1. `LATER_PASSWORD` => This is your password for later.com so puppeteer can login.
2. `LATER_USERNAME` => Later.com username
3. `RCLONE_CONF`    => This is the configuration file for rclone. Allows you to login to google drive, etc...


###  3.2. <a name='Howitworks'></a>How it works

This github action will do the following things:

1. Create a new ubuntu runner.
1. Copies this repository onto it.
1. Uses WGET to grab a copy of all text / schedule / media needed. 
1. Downloads any specified media using RClone
1. Set permissions
1. Installs Puppeteer through my own puppeteer action (https://github.com/IORoot/action__puppeteer--media)
1. Runs the code in `puppeteer.js` in this repository with puppeteer.
1. Uploads the screenshots (for debugging) as an artifact.


###  3.3. <a name='Howtouse'></a>How to use

It's pretty simple really... The config in `.github/workflows/puppeteer.yml` has a single environment variable called `remote`. This points to a server that has all of your text files on it.

The text files on your remote server are called:
- post_text_fb.txt
- post_text_ig.txt
- post_text_tw.txt
- post_schedule.txt
- post_footer.txt
- post_videourl.txt

The runner will download these using `wget` and use the contents.

####  3.3.1. <a name='post_schedule.txt'></a>post_schedule.txt

This contains, surprise, surprise, the schedule of when to post your posts.
In the Format:
```
DD MM HH mm AM/PM
```

e.g.
```
21 09 12 20 PM
```

####  3.3.2. <a name='post_footer.txt'></a>post_footer.txt
The contents of this file will be automatically appended to the bottom of the Instagram and Facebook posts, but not Twitter.

####  3.3.3. <a name='post_videourl.txt'></a>post_videourl.txt
This file contains the location of the video file of the post. I originally used a google drive location (the details are commented out in the runner config yaml), but decided to host directly on my own server, So this contains a single line with the location of that video file.

e.g.
```
https://website.com/myvideo.mp4
```

####  3.3.4. <a name='post_text_XX.txt'></a>post_text_XX.txt
The other files all contain the main teext to add to the post for that specific channel.

IG = Instagram
FB = Facebook
TW = Twitter

###  3.4. <a name='Run'></a>Run

Just run the github action as a manual step in thee "actions" tab.




##  4. <a name='Customising'></a> Customising

None.

##  5. <a name='Troubleshooting'></a>Troubleshooting

None.

<p align="right">(<a href="#top">back to top</a>)</p>


##  6. <a name='Contributing'></a>Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



##  7. <a name='License'></a>License

Distributed under the MIT License.

MIT License

Copyright (c) 2022 Andy Pearson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<p align="right">(<a href="#top">back to top</a>)</p>



##  8. <a name='Contact'></a>Contact

Author Link: [https://github.com/IORoot](https://github.com/IORoot)

<p align="right">(<a href="#top">back to top</a>)</p>

##  9. <a name='Changelog'></a>Changelog

- v1.0.0 - Initial Commit
