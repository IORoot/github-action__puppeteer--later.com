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
## How to use

1. 




## How it works

This github action will do the following things:

1. Create a new ubuntu runner.
1. Copies this repository onto it.
1. Downloads any specified media using RClone
1. Set permissions
1. Downloads any text for your post
1. Installs Puppeteer through my own puppeteer action (https://github.com/IORoot/action__puppeteer--media)
1. Runs the code in `puppeteer.js` in this repository with puppeteer.
1. Uploads the screenshots (for debugging) as an artifact.