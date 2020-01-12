import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { delay } from 'rxjs/operators';
import { AbortEnum, AbortService, CrudModule } from '../src';
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
	it('enable and disable', () =>
	{
		inject(
			[
				TestService
			], (testService : TestService) =>
			{
				testService.enableAbort();
				expect(testService.getHeader(AbortEnum.method)).to.be.equal('GET');
				expect(testService.getHeader(AbortEnum.lifetime)).to.be.equal('2000');
				testService.disableAbort();
				expect(testService.getHeader(AbortEnum.method)).to.be.equal(null);
				expect(testService.getHeader(AbortEnum.lifetime)).to.be.equal(null);
			});
	});

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
