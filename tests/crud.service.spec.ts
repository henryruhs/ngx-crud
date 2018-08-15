import { inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrudModule } from '../src';

import { TestService } from './test.service';

describe('CrudService', () =>
{
	before(() =>
	{
		TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
		TestBed.configureTestingModule(
		{
			imports:
			[
				CrudModule,
				HttpClientTestingModule
			],
			providers:
			[
				TestService
			]
		});
	});

	it('create', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.create('1',
				{
					name: 'test'
				})
				.subscribe(() => done());
		})();
	});

	it('read', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.read('1')
				.subscribe(() => done());
		})();
	});

	it('update', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.update('1',
				{
					name: 'test'
				})
				.subscribe(() => done());
		})();
	});

	it('patch', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.patch('1',
				{
					name: 'test'
				})
				.subscribe(() => done());
		})();
	});

	it('delete', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.delete('1')
				.subscribe(() => done());
		})();
	});
});
