var runner = (function () {

    const puppeteer = require('puppeteer-core');
    let puppeteer_settings = { 
        headless: true, 
        devtools: false,
        executablePath: "/usr/bin/google-chrome-stable",
        args: ['--no-sandbox']
    }
    let browser;
    let page;
    const navigationPromise = page.waitForNavigation()


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

            const puppeteer = require('puppeteer');
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            const navigationPromise = page.waitForNavigation()
            
            await page.goto('https://app.later.com/user/login')
            
            await page.setViewport({ width: 840, height: 850 })
            
            await page.waitForSelector('#ember6')
            await page.click('#ember6')
            
            await navigationPromise
            
            await page.type('#ember6', username)
            
            await page.type('#ember7', password)
            
            await page.waitForSelector('.ember-application > .ember-view > .tOB--container > .tSU--container:nth-child(2)')
            await page.click('.ember-application > .ember-view > .tOB--container > .tSU--container:nth-child(2)')
            
            await page.waitForSelector('.tSU--container__row > .tSU--card > .u--p__t__lg > .o--formSubmit > .qa--login__btn')
            await page.click('.tSU--container__row > .tSU--card > .u--p__t__lg > .o--formSubmit > .qa--login__btn')
            
            await page.screenshot({ path: 'screenshot_1.png', fullPage: true })
            
            await browser.close()
        
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


runner.args(process.argv.slice(2));s
runner.run();