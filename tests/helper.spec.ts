import { expect } from 'chai';
import { createUrl, createUrlWithId } from '../src';

describe('Helper', () =>
{
	it('create url', () =>
	{
		const testArray : any[] =
		[
			{
				apiUrl: 'http://localhost',
				endpoint: '/posts',
				url: 'http://localhost/posts'
			},
			{
				apiUrl: '..',
				endpoint: '/posts',
				url: '../posts'
			}
		];

		testArray.map(testSet => expect(createUrl(testSet.apiUrl, testSet.endpoint)).to.be.equal(testSet.url));
	});

	it('create url with id', () =>
	{
		const testArray : any[] =
		[
			{
				apiUrl: 'http://localhost/v1.0.0',
				endpoint: '/posts',
				url: 'http://localhost/v1.0.0/posts/1',
				id: 1
			},
			{
				apiUrl: '../v1.0.0',
				endpoint: '/posts',
				url: '../v1.0.0/posts/1',
				id: 1
			}
		];

		testArray.map(testSet => expect(createUrlWithId(testSet.apiUrl, testSet.endpoint, testSet.id)).to.be.equal(testSet.url));
	});
});
