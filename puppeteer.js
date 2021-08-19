var runner = (function () {

    const puppeteer = require('puppeteer-core');
    let puppeteer_settings = { 
        headless: false, 
        devtools: false,
        // executablePath: "/usr/bin/google-chrome-stable",
        executablePath: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
        args: ['--no-sandbox']
    }
    let browser;
    let page;
    let username;
    let password;
    let texturl;

    // ┌──────────────────────────────────────────────────────────┐
    // │                                                          │
    // │                    Set the Arguments                     │
    // │                                                          │
    // └──────────────────────────────────────────────────────────┘

    function publicSetArguments(arguments){
        username = arguments[0];
        console.log('Username: ', username);

        password = arguments[1];

        imageurl = arguments[2];
        console.log('Image URL: ', imageurl);

        texturl = arguments[3];
        console.log('Text URL: ', texturl);
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
            } catch {
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

                console.log('screenshot_login');
                await page.screenshot({path: './screenshot_login.png', fullPage: true});

                console.log('click login button');
                await page.click('.qa--login__btn');
                
                await page.waitForTimeout(10000);
            } catch {
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
                console.log('accept MP4');
                await fileChooser.accept(['/Users/andypearson/Repository/Code/Github Actions/workflow__puppeteer--later.com/quick_test.mp4']);

            } catch {
                console.log('Unable to upload video : ' + err);
                return;
            }

            try {
                console.log('Waiting for upload to complete')
                await page.waitForFunction(
                    'document.querySelector(".cLIB--message").innerText.includes("All Items Loaded :)")',
                );
            } catch {
                console.log('Wait for upload to complete timed out : ' + err);
                return;
            }

            console.log('screenshot_upload');
            await page.screenshot({path: './screenshot_upload.png', fullPage: true});
            
            await page.waitForTimeout(1000);
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