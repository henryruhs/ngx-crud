import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { delay } from 'rxjs/operators';
import { CrudModule } from '../src/core';
import { CacheService } from '../src/cache';
import { TestService } from './test.service';
import { mockRequest } from './helper';

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
				CacheService,
				TestService
			]
		});
});

describe('CacheService', () =>
{
	it('enable and disable', () =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService.enableCache();
			expect(testService.getContext().get(cacheService.getToken()).method).to.be.equal('GET');
			expect(testService.getContext().get(cacheService.getToken()).lifetime).to.be.equal(2000);
			testService.disableCache();
			expect(testService.getContext().get(cacheService.getToken()).method).to.be.equal(null);
			expect(testService.getContext().get(cacheService.getToken()).lifetime).to.be.equal(null);
		});
	});

	it('natural cache', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache('GET', 1000)
				.setParam('cache', '1')
				.find()
				.pipe(
					delay(500)
				)
				.subscribe(() =>
				{
					cacheService
						.get(mockRequest(testService))
						.subscribe(() =>
						{
							testService.clear();
							done();
						}, () =>
						{
							testService.clear();
							done('error');
						});
				});
		})();
	});

	it('outdated cache', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache('GET', 500)
				.setParam('cache', '2')
				.find()
				.pipe(
					delay(1000)
				)
				.subscribe(() =>
				{
					cacheService
						.get(mockRequest(testService))
						.subscribe(() =>
						{
							testService.clear();
							done('error');
						}, () =>
						{
							testService.clear();
							done();
						});
				});
		})();
	});

	it('programmatic flush', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '3')
				.find()
				.subscribe(() =>
				{
					testService.flush();
					cacheService
						.get(mockRequest(testService))
						.subscribe(() =>
						{
							testService.clear();
							done('error');
						}, () =>
						{
							testService.clear();
							done();
						});
				});
		})();
	});

	it('programmatic flush all', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '4')
				.find()
				.subscribe(() =>
				{
					cacheService
						.flushAll()
						.get(mockRequest(testService))
						.subscribe(() =>
						{
							testService.clear();
							done('error');
						}, () =>
						{
							testService.clear();
							done();
						});
				});
		})();
	});

	it('observe all', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '5')
				.find()
				.subscribe();
			cacheService
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
