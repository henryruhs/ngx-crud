import 'core-js/proposals/reflect-metadata';
import 'zone.js';
import 'jsdom-global/register';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.resetTestEnvironment();
TestBed.initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);
