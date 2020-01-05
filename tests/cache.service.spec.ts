import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { CacheService, CrudModule } from '../src';
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
				CacheService,
				TestService
			]
		});
});

describe('CacheService', () =>
{
	it('natural cache', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache('GET', 2000)
				.setParam('test', 'test')
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
							done();
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
				.enableCache()
				.setParam('test', 'test')
				.find()
				.pipe(
					delay(2000)
				)
				.subscribe(() =>
				{
					if (!cacheService.has(mockRequest(testService)))
					{
						testService.clear();
						done();
					}
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
				.setParam('test', 'test')
				.find()
				.pipe(
					delay(500)
				)
				.subscribe(() =>
				{
					if (!cacheService.has(mockRequest(testService)))
					{
						testService.clear();
						done();
					}
				});
			testService.flush();
		})();
	});
});
