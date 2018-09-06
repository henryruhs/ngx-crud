import { expect } from 'chai';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { HttpClientModule } from '@angular/common/http';
import { CommonService, CrudModule } from '../src';
import { TestService } from './test.service';

before(() =>
{
	TestBed
		.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
		.configureTestingModule(
		{
			imports:
			[
				CrudModule,
				HttpClientModule
			],
			providers:
			[
				CommonService,
				TestService
			]
		});
});

describe('CommonService', () =>
{
	it('create url', () =>
	{
		const urlArray =
		[
			{
				apiUrl: 'http://localhost',
				endpoint: '/posts',
				id: null,
				url: 'http://localhost/posts'
			},
			{
				apiUrl: 'http://localhost/v1.0.0',
				endpoint: '/posts',
				id: 1,
				url: 'http://localhost/v1.0.0/posts/1'
			},
			{
				apiUrl: '../',
				endpoint: '/posts',
				id: null,
				url: '../posts'
			},
			{
				apiUrl: '../v1.0.0',
				endpoint: '/posts',
				id: 1,
				url: '../v1.0.0/posts/1'
			}
		];

		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			urlArray.forEach(item => expect(commonService.createURL(item.apiUrl, item.endpoint, item.id)).to.be.equal(item.url));
		})();
	});
});

describe('CrudService', () =>
{
	it('create', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.create(
				{
					title: 'test'
				})
				.subscribe(response =>
				{
					expect(response.id).to.be.above(100);
					expect(response.title).to.equal('test');
					done();
				});
		})();
	});

	it('read', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.read('1')
				.subscribe(response =>
				{
					expect(response.id).to.equal(1);
					done();
				});
		})();
	});

	it('find', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.find()
				.subscribe(response =>
				{
					expect(response[0].userId).to.equal(1);
					done();
				});
		})();
	});

	it('find by user', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
			{
			testService
				.findByUser('10')
				.subscribe(response =>
				{
					expect(response[0].userId).to.equal(10);
					done();
				});
		})();
	});

	it('update', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.update('1',
				{
					title: 'test'
				})
				.subscribe(response =>
				{
					expect(response).to.deep.equal(
					{
						id: 1,
						title: 'test'
					});
					done();
				});
		})();
	});

	it('patch', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.patch('1',
				{
					title: 'test'
				})
				.subscribe(response =>
				{
					expect(response.id).to.equal(1);
					expect(response.title).to.equal('test');
					expect(response).to.have.property('body');
					done();
				});
		})();
	});

	it('delete', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.delete('1')
				.subscribe(() => done());
		})();
	});
});
