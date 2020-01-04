import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { delay } from 'rxjs/operators';
import { CacheService, CrudModule } from '../src';
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
				.find()
				.pipe(
					delay(1000)
				)
				.subscribe(() =>
				{
					cacheService
						.get(
						// @ts-ignore
						{
							urlWithParams: createUrl(testService.getApiUrl(), testService.getEndpoint())
						})
						.subscribe(response =>
						{
							testService.disableCache();
							expect(response.body[0].userId).to.equal(1);
							done();
						});
				});
		})();
	});
});
