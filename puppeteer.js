var runner = (function () {

    const fs = require("fs");
    const puppeteer = require('puppeteer-core');

    let puppeteer_settings = { 
        headless: true, 
        devtools: false,
        executablePath: "/usr/bin/google-chrome-stable",
        // executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
        args: ['--no-sandbox']
    }
    let browser;
    let page;
    let username;
    let password;
    let mediafile;
    let textfile;
    let footerdata     = "@lonetraceur";
    let textdata       = "This is a test post.";
    let scheduleday    = "1";
    let schedulemonth  = "1";
    let schedulehour   = "11";
    let scheduleminute = "00";
    let scheduleampm   = "AM";

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                    Set the Arguments                     │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘

    function publicSetArguments(arguments){
        username = arguments[0];
        console.log('Username (string): ', username);

        password = arguments[1];
        console.log('Password (string): ###');

        mediafile = arguments[2];
        console.log('Media File (string): ', mediafile);

        textfile = arguments[3];
        console.log('Text File (string): ', textfile);

        footerdata = fs.readFileSync('footer', 'utf8');
        console.log('TEXTDATA: ' + footerdata)

        textdata = fs.readFileSync(textfile, 'utf8');
        textdata = textdata + footerdata;
        console.log('TEXTDATA: ' + textdata)

        scheduleday= parseInt(arguments[4]);
        console.log('Schedule Day (int): ', scheduleday);

        schedulemonth= parseInt(arguments[5]);
        console.log('Schedule Month (int): ', schedulemonth);

        schedulehour= parseInt(arguments[6]);
        console.log('Schedule Hour (int): ', schedulehour);

        scheduleminute= parseInt(arguments[7]);
        console.log('Schedule Minute (int): ', scheduleminute);

        scheduleampm= arguments[8];
        console.log('Schedule am/pm (string): ', scheduleampm);

    }

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                       Run Function                       │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    function publicRun(){

        (async () => {

            /**
             * New puppeteer
             */
            try {
                console.log('Launch Puppeteer');
                browser = await puppeteer.launch(puppeteer_settings);
            } catch (err) {
                console.log('Error launching puppeteer : ' + err);
                return;
            } 


            /**
             * New Browser
             */
            try {
                console.log('create browser');
                const context = browser.defaultBrowserContext();
            } catch (err) {
                console.log('Error creating browser : ' + err);
                return;
            } 


            
            /**
             * New Page & viewport
             */
            try {
                console.log('create page');
                page = await browser.newPage();
                await page.setDefaultNavigationTimeout(10000);
                await page.setViewport({ width: 1200, height: 800 });
            } catch (err) {
                console.log('Error creating page : ' + err);
                return;
            } 
            
            let version = await page.browser().version();
            console.log('browser version:' + version);


            /**
             * Change User-Agent
             */
            try {
                console.log('Changing user-agent');
                await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36');
            } catch (err) {
                console.log('Unable to change UserAgent : ' + err);
                return;
            }


            /**
             * Login
             */
            try {
                console.log('Navigating to page');
                await page.goto('https://app.later.com/user/login', { waitUntil: "networkidle2" });
                
                console.log('wait for selector');
                await page.waitForSelector('#ember6');

                console.log('click #ember6');
                await page.click('#ember6');
                
                console.log('type into #ember6 (username)');
                await page.type('#ember6', username);
                
                console.log('type into #ember7 (password)');
                await page.type('#ember7', password);

                console.log('click login button');
                await page.click('.qa--login__btn');
                
                await page.waitForTimeout(3000);
            } catch (err) {
                console.log('Unable to login : ' + err);
                return;
            }


            /**
             * Upload Media
             */
            try {
                console.log('click upload button');
                
                const [fileChooser] = await Promise.all([
                    page.waitForFileChooser(),
                    page.click('.cLIB--boardHeader > .cLIB--boardHeader__upload > .cUP--upload > .is--base > span'),
                ]);
                console.log('Choose Media file: ' + mediafile);
                await fileChooser.accept([mediafile]);
                await page.waitForTimeout(3000);
            } catch (err) {
                console.log('Unable to upload media : ' + err);
                return;
            }


            /**
             * Wait for screenshot to upload
             */
            try {
                console.log('Waiting for upload to complete')
                await page.waitForSelector('.cLIB--boardListContainer li:nth-child(1) .o--mediaContainer .o--media').then(() => console.log('got it'));
                await page.waitForTimeout(100);
            } catch (err) {
                console.log('Wait for upload to complete timed out : ' + err);
                return;
            }


            /**
             * Select Instagram
             */
            try {
                console.log('Selecting Instagram')
                await page.click('.is--p__igpink.is--unselected .cCA--account__action--primary');
            } catch (err) {
                console.log('Not clicking on Instagram, already selected.');
            }


            /**
             * Select Facebook
             */
            try {
                console.log('Selecting Facebook')
                await page.click('.is--p__yellow.is--unselected .cCA--account__action--primary');
            } catch (err) {
                console.log('Not clicking on Facebook, already selected.');
            }


            /**
             * Select Twitter
             */
            try {
                console.log('Selecting Twitter')
                await page.click('.is--p__twblue.is--unselected .cCA--account__action--primary');
            } catch (err) {
                console.log('Not clicking on Twitter, already selected.');
            }


            /**
             * Click on first media image
             */
            try {
                console.log('Clicking image')
                await page.click('.cLIB--boardListContainer li:nth-child(1)');
                await page.waitForTimeout(3000);
            } catch (err) {
                console.log('Error clicking on item to schedule post : ' + err);
                return;
            }


            /**
             * Click on "CREATE POST" button
             */
            try {
                console.log('Clicking on create posts button');
                await page.click('.qa--media_modal__primary_button');
            } catch (err) {
                console.log('Error clicking on item to schedule post : ' + err);
                return;
            }


            /**
             * Click on Calendar Dropdown
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Clicking on Calendar dropdown');
                await page.click('.cPM--modalHeader .cPM--field__dropdown');
            } catch (err) {
                console.log('Error clicking on calendar dropdown : ' + err);
                return;
            }


            /**
             * Toggle AM / PM
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Selecting AM / PM: ' + scheduleampm);
                const CurrentAMPM = await page.$eval('.flatpickr-am-pm', element => element.innerHTML);
                if (CurrentAMPM != scheduleampm) {
                    await page.click('.flatpickr-am-pm');
                }
            } catch (err) {
                console.log('Error clicking on AM / PM : ' + err);
                return;
            }


            /**
             * Select Hour
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Selecting Hour: ' + schedulehour);
                await page.type('.flatpickr-hour', '' + schedulehour);
                await page.keyboard.press('Tab'); 
            } catch (err) {
                console.log('Error clicking on selecting hour : ' + err);
                return;
            }            


            /**
             * Select Minute
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Selecting Minute: ' + scheduleminute);
                await page.type('.flatpickr-minute', '' + scheduleminute);
                await page.keyboard.press('Tab');
            } catch (err) {
                console.log('Error clicking on selecting minute : ' + err);
                return;
            }


            /**
             * Select Day
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Selecting Day: ' + scheduleday);

                const targetEls = await page.$$('.flatpickr-day');  // double $$ is ALL elements.

                for(let target of targetEls){
                    const iHtml = await page.evaluate(el => el.innerHTML, target); 

                    if (iHtml  == scheduleday) {
                        await target.click();
                        break;
                    }
                }
            } catch (err) {
                console.log('Error clicking on selecting day : ' + err);
                return;
            }


            /**
             * Select Month
             */
            try {
                await page.waitForTimeout(1000);
                let selectmonth = '' + (schedulemonth - 1);
                console.log('Selecting Month (-1): ' + selectmonth);
                await page.select('select.flatpickr-monthDropdown-months', selectmonth);
                
            } catch (err) {
                console.log('Error clicking on selecting month : ' + err);
                return;
            }


            /**
             * Close Calendar
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Close Calendar: ' + scheduleampm);
                await page.keyboard.press('Enter');
            } catch (err) {
                console.log('Error closing calendar : ' + err);
                return;
            }


            /**
             * Type in caption
             */
            try {
                console.log('Typing in text.');
                await page.type('.o--modalCard .cPM--field__composerBody textarea', textdata);
            } catch (err) {
                console.log('Error typing into composer textarea : ' + err);
                return;
            }


            /**
             * Click on "CUSTOMIZE 3 POSTS"
             */
            try {
                console.log('Clicking on Customize Posts button');
                await page.click('.o--btn--primary');
            } catch (err) {
                console.log('Error clicking on customize posts button : ' + err);
                return;
            }


            /**
             * Click on "SAVE 3 POSTS"
             */
            try {
                await page.waitForTimeout(1000);
                console.log('Clicking on Save button');
                await page.click('.qa--media_modal__primary_button');
            } catch (err) {
                console.log('Error clicking on save posts button : ' + err);
                return;
            }


            /**
             * Click on "DONE"
             */
            try {
                console.log('Clicking on X on any popup');
                await page.waitForTimeout(1000);
                await page.click('.o--modal--closeIcon');
            } catch (err) {
                console.log('Error clicking on X on popup: ' + err);
            }


            /**
             * Click on "CANCEL"
             */
            try {
                console.log('Clicking on Cancel on any popup');
                await page.waitForTimeout(1000);
                await page.click('.qa--modal_cancel_btn');
            } catch (err) {
                console.log('Error clicking on cancel on popup: ' + err);
            }


            /**
             * Screenshot & close
             */
            console.log('screenshot_upload');
            await page.screenshot({path: './screenshot_upload.png', fullPage: true});
            // await page.waitForTimeout(1000);
            await browser.close();
        
        })();

    }


    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                        Make Public                       │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘
    return {    
        run: publicRun,
        args: publicSetArguments
    };

})();
module.exports = { runner };


runner.args(process.argv.slice(2));
runner.run();