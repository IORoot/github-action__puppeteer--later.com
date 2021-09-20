# Later.com Puppeteer Script

This is a puppeteer automation script to auto-schedule Instagram, Facebook and Twitter posts through Later.com.

## Why?
Well, Facebook & Instagram's API is a shit-show. The whole thing is just a pain.
Therefore, Later.com has a nice interface that doesn't change very often (which makes it predicatble) and easier to script. 
Also, Later.com gives the following:
- Free 30 posts per month for an entire social set.
- Free Instagram Videos (not just images)
- Free scheduling
- Their DOM is also easier to script - no random class names and obfuscation like facebook.

So, basically, this is a great service for free.


## Setup
You need to setup three secrets in your github repo:
1. `LATER_PASSWORD` => This is your password for later.com so puppeteer can login.
2. `LATER_USERNAME` => Later.com username
3. `RCLONE_CONF`    => This is the configuration file for rclone. Allows you to login to google drive, etc...


## How it works

This github action will do the following things:

1. Create a new ubuntu runner.
1. Copies this repository onto it.
1. Uses WGET to grab a copy of all text / schedule / media needed. 
1. Downloads any specified media using RClone
1. Set permissions
1. Installs Puppeteer through my own puppeteer action (https://github.com/IORoot/action__puppeteer--media)
1. Runs the code in `puppeteer.js` in this repository with puppeteer.
1. Uploads the screenshots (for debugging) as an artifact.


## How to use

It's pretty simple really... The config in `.github/workflows/puppeteer.yml` has a single environment variable called `remote`. This points to a server that has all of your text files on it.

The text files on your remote server are called:
- post_text_fb.txt
- post_text_ig.txt
- post_text_tw.txt
- post_schedule.txt
- post_footer.txt
- post_videourl.txt

The runner will download these using `wget` and use the contents.

### post_schedule.txt

This contains, surprise, surprise, the schedule of when to post your posts.
In the Format:
```
DD MM HH mm AM/PM
```

e.g.
```
21 09 12 20 PM
```

### post_footer.txt
The contents of this file will be automatically appended to the bottom of the Instagram and Facebook posts, but not Twitter.

### post_videourl.txt
This file contains the location of the video file of the post. I originally used a google drive location (the details are commented out in the runner config yaml), but decided to host directly on my own server, So this contains a single line with the location of that video file.

e.g.
```
https://website.com/myvideo.mp4
```

### post_text_XX.txt
The other files all contain the main teext to add to the post for that specific channel.

IG = Instagram
FB = Facebook
TW = Twitter

## Run

Just run the github action as a manual step in thee "actions" tab.
