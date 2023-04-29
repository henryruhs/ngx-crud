import { HttpClientModule } from '@angular/common/http';
import { filter, take } from 'rxjs/operators';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { CrudModule, AbortService } from '../src';

import { TestService } from './test.service';
import { mockRequest } from './test.helper';

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

describe(AbortService.name, () =>
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
				.pipe(
					filter(signal => signal === 'ABORTED')
				)
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
				.pipe(
					filter(signal => signal === 'ABORTED')
				)
				.subscribe(() =>
				{
					testService.clear();
					done();
				});
		})();
	});

	it('programmatic abort many', done =>
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
				.abortMany('https://jsonplaceholder.typicode.com/posts')
				.get(mockRequest(testService))
				.pipe(
					filter(signal => signal === 'ABORTED')
				)
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
					.setParam('abort', '4')
					.find()
					.subscribe(() =>
					{
						testService.clear();
						done('error');
					});
				abortService
					.abortAll()
					.get(mockRequest(testService))
					.pipe(
						filter(signal => signal === 'ABORTED')
					)
					.subscribe(() =>
					{
						testService.clear();
						done();
					});
		})();
	});

	it('observe', done =>
	{
		inject(
			[
				AbortService,
				TestService
			], (abortService : AbortService, testService : TestService) =>
			{
				abortService
					.observe('https://jsonplaceholder.typicode.com/posts?abort=5')
					.pipe(take(1))
					.subscribe(
					{
						next: value =>
						{
							expect(value.length).to.be.above(0);
							testService.clear();
							done();
						},
						error: () =>
						{
							testService.clear();
							done('error');
						}
					});
				testService
					.enableAbort()
					.setParam('abort', '5')
					.find()
					.subscribe();
			})();
	});

	it('observe many', done =>
	{
		inject(
		[
			AbortService,
			TestService
		], (abortService : AbortService, testService : TestService) =>
		{
			abortService
				.observeMany('https://jsonplaceholder.typicode.com/posts')
				.pipe(take(1))
				.subscribe(
				{
					next: value =>
					{
						expect(value.length).to.be.above(0);
						testService.clear();
						done();
					},
					error: () =>
					{
						testService.clear();
						done('error');
					}
				});
			testService
				.enableAbort()
				.setParam('abort', '6')
				.find()
				.subscribe();
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
			abortService
				.observeAll()
				.pipe(take(1))
				.subscribe(
				{
					next: value =>
					{
						expect(value.length).to.be.above(0);
						testService.clear();
						done();
					},
					error: () =>
					{
						testService.clear();
						done('error');
					}
				});
			testService
				.enableAbort()
				.setParam('abort', '7')
				.find()
				.subscribe();
		})();
	});
});
