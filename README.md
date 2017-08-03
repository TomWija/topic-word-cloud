# Topic World Cloud

Node Version: 8.1.4
npm Version: 5.3.0

# Installation

Begin by cloning the project to your local machine and navigating to the directory
`$ git clone git@github.com:TomWija/topic-word-cloud.git && cd topic-word-cloud`

## Quick steps
These are the quickest steps for installing/setting up this project. Assuming Node is already installed and you're on linux/Mac
```
$ git clone git@github.com:TomWija/topic-word-cloud.git && cd topic-word-cloud
$ npm install
$ ./node_modules/.bin/gulp build
```

You can then serve the application using browsersync by running
```
$ ./node_modules/.bin/gulp serve
```

Or you can just open the `index.html` file.

For a detailed breakdown on what you need to do, how the project works and how to test to project, see below.

## Installing Node

This project requires you to have the latest versions of Node and NPM installed on your system.

Download Node from: https://nodejs.org/en/

If you're on linux, you can also run this:

`$ sudo apt-get install node`

Or if you're on a Mac with brew installed, you can run this:

`$ brew install node`

Once you have downloaded/installed node, confirm it has been installed successfully by running:
```
$ node -v
$ npm -v
```

## Installing the node dependencies
After installing node on your local machine, navigate to the root directory of this project and run
`$ npm install`

This will download the dependencies needed for the project to work correctly.

If deploying to a production server, run
`$ npm install --production`
Instead to avoid installing all of the devDependencies.

# Styles and Javascript
## Compiling Sass and Js
Javascript and Sass files are compiled, transpiled and minified using gulp. If you've made any changes to the CSS, you will need to run

`$ ./node_modules/.bin/gulp build`

before you can see them

## Browser Compatibility
This project was designed with keeping the following browsers supported (ordered by usage data).
```
Chrome (35+)          - 42%
Safari (7+)           - 23%
IE11                  - 15%
Firefox (29+)         - 15%
IE10                  - 2.5%
IE9                   - 2%
Other                 - 0.5%
```
To this end, autoprefixer is being used when compiling SCSS into CSS to ensure that any rules that need the `-ms`, `-webkit`, `-moz` etc. prefixes are given them when being compiled. This also means you can write the CSS without needing to specify these, leading to cleaner, easier to read code.

We're also using the babel transpiler with the latest compatibility settings downloaded, allowing you to code using ES6+ practices without worrying about compatibility with older browsers.

## Code Style
This project comes packaged with an `.eslintrc` allowing you to use eslint in your text-editor of choice to help keep any code you write to project conventions easily.

## BrowserSync
This project is also set up to use Browsersync. This will watch all the HTML, SCSS and JS files that you're working on and automatically compile and refresh the view in the browser, immediately showing you changes you make after saving without having to manually compile and refresh the browser.

This can be run by using

`$ ./node_modules/.bin/gulp serve`

That will host the server on:
http://localhost:3000

while also providing tools at: http://localhost:3001

# Testing

## Unit Testing
For testing, we're using Mocha and Chai test frameworks.

The tests for the project are all stored in:
`htdocs\resources\private\tests`

Writing new tests should follow the format:
`featurebeingtested_test.js`

To run the tests, simply use:
`npm run tests`
to see the results in your terminal.

Alternatively, if you'd prefer to run the test files individually, this can be done using:
`mocha ./htdocs/resources/private/tests/<name of test file>.js`

## Cross-browser testing
For the cross browser testing I used browserstack, checking each of the following browsers to ensure the word cloud worked and displayed as expected:
```
Chrome 35          
Safari 7           
IE11                  
Firefox 29         
IE10                  
IE9                  
Chrome for Android (Latest Version, On google pixel)
Safari for Iphone (Latest Version, on iPhone 6s)
Other                 
```
