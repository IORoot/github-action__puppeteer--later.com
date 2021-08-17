# Demo Puppeteer Github Action Script

A demo repository that runs the `IORoot/action__puppeteer--media@master` action.

## Files

1. package.json
2. puppeteer.js
3. .github/workflows/puppeteer.yml

### package.json

The key component of the package.json is that you include the `puppeteer-core` dependency.

```
    "dependencies": {
        "puppeteer-core": "^5.4.1"
    }
```


### puppeteer.js

This is the script that will execute and run puppeteer. I've made this a little more verbose and included some
try/catch blocks to demo better javascript structure.

There is one "class", called `runner`, that has one publid method called: `run`.

You can see at the bottom we execute the class with:
```javascript
runner.run();
```

This in-turn, will call the `publicRun` method in the class - which will step through the try/catch blocks.


### .github/workflows/puppeteer.yml

The workflow action only has a manual `workflow_dispatch`, so you'll have to go into the 'actions' tab on github and
manually run the action.

This repo demonstrates the usage of the github action "IORoot/action__puppeteer--media@master" which will run a 
docker container with an instance of puppeteer in it. 

To use the action, it's a matter of running youre commands like so:

```yaml
    - name: Test Code
      uses: IORoot/action__puppeteer--media@master
      with:
        args: npm install
```