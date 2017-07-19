# topic-word-cloud

## Installation

Begin by cloning the project to your local machine and navigating to the directory
`$ git clone git@github.com:TomWija/topic-word-cloud.git && cd topic-word-cloud`

### Installing Node

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

### Installing the node dependencies
After installing node on your local machine, navigate to the root directory of this project and run:
`$ npm install`

This will download the dependencies needed for the project to work correctly.

## Compiling Sass and Js
Javascript and Sass files are compiled, transpiled and minified using gulp. If you've made any changes to the CSS, you will need to run:

`$ gulp build`

before you can see them

### BrowserSync
This project is also set up to use Browsersync. This will watch all the HTML, SCSS and JS files that you're working on and automatically compile and refresh the view in the browser, immediately showing you changes you make after saving without having to manually compile and refresh the browser.

This can be run by using:
`$ gulp build`

That will host the server on:
http://localhost:3000

while also providing tools at: http://localhost:3001

## Testing
For testing, we're using Mocha and Chai test frameworks.

The tests for the project are all stored in:
`htdocs\resources\private\tests`

Writing new tests should follow the format:
`featurebeingtested_test.js`

To run the tests, simply use:
`npm run tests`
to see the results in your terminal.

Alternatively, if you'd prefer to run the test files individually, this can be done using:
`mocha ./htdocs\resources\private\tests\<name of test file>.js`
