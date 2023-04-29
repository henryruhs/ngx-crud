import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { CrudModule, ObserveService, OBSERVE_EFFECT } from '../src';

import { TestService } from './test.service';
import { TestEffect } from './test.effect';
import { getToken } from './test.helper';

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
				ObserveService,
				TestService,
				{
					provide: OBSERVE_EFFECT,
					useClass: TestEffect
				}
			]
		});
});

describe(ObserveService.name, () =>
{
	it('enable and disable', () =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			testService.enableObserve();
			expect(testService.getContext().get(observeService.getToken()).method).to.be.equal('ANY');
			expect(testService.getContext().get(observeService.getToken()).lifetime).to.be.equal(1000);
			testService.disableObserve();
			expect(testService.getContext().get(observeService.getToken()).method).to.be.equal(null);
			expect(testService.getContext().get(observeService.getToken()).lifetime).to.be.equal(null);
		});
	});

	it('before and after', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.enableObserve('GET')
				.setParam('observe', '1')
				.find()
				.subscribe(
				{
					next: () =>
					{
						expect(testService.getContext().get(getToken()).before).to.be.true;
						expect(testService.getContext().get(getToken()).after).to.be.true;
						testService.clear();
						done();
					},
					error: () =>
					{
						testService.clear();
						done('error');
					}
				});
		})();
	});

	it('natural error', done =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			observeService
				.observe('https://jsonplaceholder.typicode.com/error')
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
				.clone()
				.setApiRoute('/error')
				.enableObserve()
				.find()
				.pipe(catchError(() => EMPTY))
				.subscribe();
		})();
	});

	it('observe', done =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			observeService
				.observe('https://jsonplaceholder.typicode.com/posts?observe=2')
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
				.enableObserve()
				.setParam('observe', '2')
				.find()
				.subscribe();
		})();
	});

	it('observe many', done =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			observeService
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
				.enableObserve()
				.setParam('observe', '3')
				.find()
				.subscribe();
		})();
	});

	it('observe all', done =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			observeService
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
				.enableObserve()
				.setParam('observe', '4')
				.find()
				.subscribe();
		})();
	});
});
