import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
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
				.enableAbort('GET', 0)
				.setParam('abort', '1')
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
				.setParam('abort', '2')
				.find()
				.pipe(
					delay(500)
				)
				.subscribe(() =>
				{
					testService.clear();
					done('error');
				});
			testService.abort();
			abortService
				.get(mockRequest(testService))
				.subscribe(() =>
				{
					testService.clear();
					done();
				});
		})();
	});

	it('programmatic abort all', done =>
	{
		inject(
		[
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
				testService
					.enableAbort()
					.setParam('abort', '3')
					.find()
					.pipe(
						delay(500)
					)
					.subscribe(() =>
					{
						testService.clear();
						done('error');
					});
				abortService
					.abortAll()
					.get(mockRequest(testService))
					.subscribe(() =>
					{
						testService.clear();
						done();
					});
		})();
	});
});
