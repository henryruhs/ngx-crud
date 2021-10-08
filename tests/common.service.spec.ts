import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { CommonService } from '../src/common';
import { CrudModule } from '../src';
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
			commonService.appendParam('test', '1').setParamArray('test',
			[
				'2',
				'3'
			]).appendParam('test', '4');
			expect(commonService.getParamArray('test')).to.deep.equal(
			[
				'2',
				'3',
				'4'
			]);
			commonService.appendParam('test', '5').appendParamArray('test', [
				'6',
				'7'
			]);
			expect(commonService.getParamArray('test')).to.deep.equal(
			[
				'2',
				'3',
				'4',
				'5',
				'6',
				'7'
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
			commonService.appendHeader('test', '1').setHeaderArray('test',
			[
				'2',
				'3'
			]).appendHeader('test', '4');
			expect(commonService.getHeaderArray('test')).to.deep.equal(
			[
				'2',
				'3',
				'4'
			]);
			commonService.appendHeader('test', '5').appendHeaderArray('test', [
				'6',
				'7'
			]);
			expect(commonService.getHeaderArray('test')).to.deep.equal(
			[
				'2',
				'3',
				'4',
				'5',
				'6',
				'7'
			]);
			expect(commonService.clearHeader('test').getHeaderArray('test')).to.be.equal(null);
		})();
	});

	it('get http client', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			expect(commonService.getHttpClient()).to.be.instanceof(HttpClient);
		})();
	});
});
