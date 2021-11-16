import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
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
				TestService
			]
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
					title: 'test',
					body: 'test',
					userId: '1'
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

	it('request', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.request('GET')
				.subscribe(() => done());
		})();
	});
});
