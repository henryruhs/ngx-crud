import { HttpClientModule } from '@angular/common/http';
import { concatMap, delay, take, tap } from 'rxjs/operators';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { CrudModule, CacheService } from '../src';
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
					delay(500),
					concatMap(() => cacheService.get(mockRequest(testService)))
				)
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
					delay(1000),
					concatMap(() => cacheService.get(mockRequest(testService)))
				)
				.subscribe(
				{
					next: () =>
					{
						testService.clear();
						done('error');
					},
					error: () =>
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
				.setParam('cache', '3')
				.find()
				.pipe(
					tap(() => testService.flush()),
					concatMap(() => cacheService.get(mockRequest(testService)))
				)
				.subscribe(
				{
					next: () =>
					{
						testService.clear();
						done('error');
					},
					error: () =>
					{
						testService.clear();
						done();
					}
				});
		})();
	});

	it('programmatic flush many', done =>
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
				.pipe(
					concatMap(() => cacheService.flushMany('https://jsonplaceholder.typicode.com/posts').get(mockRequest(testService)))
				)
				.subscribe(
				{
					next: () =>
					{
						testService.clear();
						done('error');
					},
					error: () =>
					{
						testService.clear();
						done();
					}
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
				.setParam('cache', '5')
				.find()
				.pipe(
					concatMap(() => cacheService.flushAll().get(mockRequest(testService)))
				)
				.subscribe(
				{
					next: () =>
					{
						testService.clear();
						done('error');
					},
					error: () =>
					{
						testService.clear();
						done();
					}
				});
		})();
	});

	it('observe', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '6')
				.find()
				.subscribe();
			cacheService
				.observe('https://jsonplaceholder.typicode.com/posts?cache=6')
				.pipe(take(1))
				.subscribe(
				{
					next: store =>
					{
						expect(store.length).to.be.above(0);
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

	it('observe many', done =>
	{
		inject(
		[
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '7')
				.find()
				.subscribe();
			cacheService
				.observeMany('https://jsonplaceholder.typicode.com/posts')
				.pipe(take(1))
				.subscribe(
				{
					next: store =>
					{
						expect(store.length).to.be.above(0);
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
			CacheService,
			TestService
		], (cacheService : CacheService, testService : TestService) =>
		{
			testService
				.enableCache()
				.setParam('cache', '8')
				.find()
				.subscribe();
			cacheService
				.observeAll()
				.pipe(take(1))
				.subscribe(
				{
					next: store =>
					{
						expect(store.length).to.be.above(0);
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
