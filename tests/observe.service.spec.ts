import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { ObserveEnum, ObserveService, CrudModule } from '../src';
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
				ObserveService,
				TestService
			]
		});
});

describe('ObserveService', () =>
{
	it('enable and disable', () =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService.enableObserve();
			expect(testService.getHeader(ObserveEnum.method)).to.be.equal('GET');
			expect(testService.getHeader(ObserveEnum.lifetime)).to.be.equal('1000');
			testService.disableObserve();
			expect(testService.getHeader(ObserveEnum.method)).to.be.equal(null);
			expect(testService.getHeader(ObserveEnum.lifetime)).to.be.equal(null);
		});
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
				.subscribe(() =>
				{
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
