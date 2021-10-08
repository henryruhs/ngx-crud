import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { mockRequest } from './helper';
import { CrudModule } from '../src';
import { AbortService } from '../src/abort';
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
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
			testService.enableAbort();
			expect(testService.getContext().get(abortService.getToken()).method).to.be.equal('GET');
			expect(testService.getContext().get(abortService.getToken()).lifetime).to.be.equal(2000);
			testService.disableAbort();
			expect(testService.getContext().get(abortService.getToken()).method).to.be.equal(null);
			expect(testService.getContext().get(abortService.getToken()).lifetime).to.be.equal(null);
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
				.enableAbort('GET', 1)
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

	it('observe all', done =>
	{
		inject(
		[
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
			testService
				.enableAbort()
				.setParam('abort', '4')
				.find()
				.subscribe();
			abortService
				.observeAll()
				.subscribe(store =>
				{
					expect(store.length).to.be.above(0);
					testService.clear();
					done();
				}, () =>
				{
					testService.clear();
					done('error');
				});
		})();
	});
});
