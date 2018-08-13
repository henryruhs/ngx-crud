import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TestService } from './test.service';

describe('CrudService', () =>
{
	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			imports:
			[
				HttpClientModule
			],
			providers:
			[
				TestService
			]
		});
	});

	it('create', done =>
	{
		inject(
		[
			TestService
		], (testService : TestService) =>
		{
			testService
				.create('1',
				{
					name: 'test'
				})
				.subscribe(() => done());
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
				.subscribe(() => done());
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
					name: 'test'
				})
				.subscribe(() => done());
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
					name: 'test'
				})
				.subscribe(() => done());
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
