import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { AbortService, CrudModule } from '../src';
import { createUrl } from '../src/helper';
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
				.find()
				.subscribe(() =>
				{
					testService.disableAbort();
					done('error');
				});
			abortService
				.get(
				// @ts-ignore
				{
					urlWithParams: createUrl(testService.getApiUrl(), testService.getEndpoint())
				})
				.subscribe(() =>
				{
					testService.disableAbort();
					done();
				});
		})();
	});
});
