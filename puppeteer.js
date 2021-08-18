var runner = (function () {

    const puppeteer = require('puppeteer-core');
    let puppeteer_settings = { 
        headless: false, 
        devtools: false,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ['--no-sandbox']
    }
    let browser;
    let page;

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                    Set the Arguments                     │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘

    function publicSetArguments(arguments){
        let username = arguments[0];
        console.log('Username: ', username);
        let password = arguments[1];
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


            let agent = await page.browser().userAgent();
            console.log('before user-agent:' + agent);
            // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36');
            let agent = await page.browser().userAgent();
            console.log('after user-agent:' + agent);


            console.log('goto page');
            await page.goto('https://app.later.com/user/login', { waitUntil: "networkidle2" });

            console.log('screenshot');
            await page.screenshot({path: './screenshot.png', fullPage: true});
            
            // console.log('wait for selector');
            // await page.waitForSelector('#ember6');

            // console.log('click #ember6');
            // await page.click('#ember6');
            
            // console.log('waitForNavigation');
            // await page.waitForNavigation();
            
            // console.log('type into #ember6');
            // await page.type('#ember6', username);
            
            // console.log('type into #ember7');
            // await page.type('#ember7', password);
            
            // await page.waitForSelector('.ember-application > .ember-view > .tOB--container > .tSU--container:nth-child(2)');
            // await page.click('.ember-application > .ember-view > .tOB--container > .tSU--container:nth-child(2)');
            
            // await page.waitForSelector('.tSU--container__row > .tSU--card > .u--p__t__lg > .o--formSubmit > .qa--login__btn');
            // await page.click('.tSU--container__row > .tSU--card > .u--p__t__lg > .o--formSubmit > .qa--login__btn');
            
            // await page.screenshot({ path: 'screenshot_1.png', fullPage: true });
            
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