import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { AbortService, CrudModule } from '../src';
import { mockRequest } from './helper';
import { TestService } from './test.service';

before(() =>
{
	TestBed
		.configureTestingModule(
		{
			imports:
			[
				CrudModule,
				HttpClientModule
			],
			providers:
			[
				AbortService,
				TestService
			]
		});
});

describe('AbortService', () =>
{
	it('natural abort', done =>
	{
		inject(
		[
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
			testService
				.enableAbort('GET', 100)
				.setParam('test', 'test')
				.find()
				.subscribe(() =>
				{
					testService.clear();
					done('error');
				});
			abortService
				.get(mockRequest(testService))
				.subscribe(() =>
				{
					testService.clear();
					done();
				});
		})();
	});

	it('programmatic abort', done =>
	{
		inject(
		[
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
			testService
				.enableAbort()
				.setParam('test', 'test')
				.find()
				.subscribe(() =>
				{
					testService.clear();
					done('error');
				});
			abortService
				.get(mockRequest(testService))
				.subscribe(() =>
				{
					testService.clear();
					done();
				});
			testService.abort();
		})();
	});
});
