require('core-js/proposals/reflect-metadata');
require('zone.js');
require('ts-node/register');
require('jsdom-global/register');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.resetTestEnvironment();
testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
