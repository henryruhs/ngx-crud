import { HttpClient, HttpClientModule, HttpContextToken } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { CrudModule, CommonService, Context } from '../src';
import { TestService } from './test.service';

describe('CommonService', () =>
{
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

	it('context by token', () =>
	{
		inject(
		[
			CommonService
		], (commonService : CommonService) =>
		{
			const defaultContext : Context =
			{
				method: 'ANY',
				lifetime: 1000
			};
			const token : HttpContextToken<Context> = new HttpContextToken<Context>(() => defaultContext);

			expect((commonService.getContextByToken(token) as Context).method).to.be.equal('ANY');
			expect((commonService.getContextByToken(token) as Context).lifetime).to.be.equal(1000);
			commonService.setContextByToken(token,
			{
				method: 'GET',
				lifetime: 2000
			});
			expect((commonService.getContextByToken(token) as Context).method).to.be.equal('GET');
			expect((commonService.getContextByToken(token) as Context).lifetime).to.be.equal(2000);
			commonService.clearContextByToken(token);
			expect((commonService.getContextByToken(token) as Context).method).to.be.equal('ANY');
			expect((commonService.getContextByToken(token) as Context).lifetime).to.be.equal(1000);
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
