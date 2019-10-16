import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { CommonService, CrudModule } from '../src';
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
				CommonService,
				TestService
			]
		});
});

describe('CommonService', () =>
{
	it('simple param', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			commonService.setParam('test', 'test');
			expect(commonService.getParam('test')).to.be.equal('test');
			expect(commonService.clearParam('test').getParam('test')).to.be.equal(null);
		})();
	});

	it('multidimensional param', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			commonService.appendParam('test', 'test').appendParam('test', 'test');
			expect(commonService.getParamArray('test')).to.deep.equal(
			[
				'test',
				'test'
			]);
			expect(commonService.clearParam('test').getParamArray('test')).to.be.equal(null);
		})();
	});

	it('simple header', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			commonService.setHeader('test', 'test');
			expect(commonService.getHeader('test')).to.be.equal('test');
			expect(commonService.clearHeader('test').getHeader('test')).to.be.equal(null);
		})();
	});

	it('multidimensional header', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			commonService.appendHeader('test', 'test').appendHeader('test', 'test');
			expect(commonService.getHeaderArray('test')).to.deep.equal(
			[
				'test',
				'test'
			]);
			expect(commonService.clearHeader('test').getHeaderArray('test')).to.be.equal(null);
		})();
	});

	it('create url', () =>
	{
		const urlArray : any[] =
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
