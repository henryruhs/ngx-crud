import { HttpClientModule } from '@angular/common/http';
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

describe('ObserveService', () =>
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

	it('observe all', done =>
	{
		inject(
		[
			ObserveService,
			TestService
		], (observeService : ObserveService, testService : TestService) =>
		{
			testService
				.enableObserve('GET')
				.find()
				.subscribe();
			observeService
				.observeAll()
				.subscribe(
				{
					next: () =>
					{
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
});
