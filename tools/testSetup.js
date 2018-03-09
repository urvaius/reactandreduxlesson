// this file is written in es5 since its no transpiled by babel
//this file does the following
// 1. sets node environment variable
// 2. registers babel for transpiling our code for testing
// 3/ disables webpack-specific features that mocha doeesn't understand
// 4. requires isdom so we can test via an in-memory dom in node
// 5. sets up a global vars that mimic a browser

/* eslint-disable no-var*/

/* this setting assures the .babelrc dev ocnfig (which includes
hot module reloading code) doesnt apply for tests. 
but also, we don't want to set it to prodution here for two reasong.
1. you won't see any proptype validation warnings when code is runnin in prod mode. 
2. tests will not display detailed error messages
when running against production version code
*/
process.env.NODE_ENV = 'test';

//Register babel so that it will transpile es6 to es5
//before our tests run
require('babel-register')();

// disable webpack-specific features for tests since
// mocha doesnt know what to do with them.
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};

//configure JSDOM and set global variables
// to simulate a browser environment for tests. 
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};