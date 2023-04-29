import { expect } from 'chai';

import { createUrl, createUrlWithId, stripUrlParams, Id } from '../src';

describe(createUrl.name, () =>
{
	it('create url', () =>
	{
		const testArray : { apiUrl : string; apiRoute : string; url : string; }[] =
		[
			{
				apiUrl: 'http://localhost',
				apiRoute: '/posts',
				url: 'http://localhost/posts'
			},
			{
				apiUrl: '..',
				apiRoute: '/posts',
				url: '../posts'
			}
		];

		testArray.map(testSet => expect(createUrl(testSet.apiUrl, testSet.apiRoute)).to.be.equal(testSet.url));
	});

	it('create url with id', () =>
	{
		const testArray : { apiUrl : string; apiRoute : string; id : Id; url : string; }[] =
		[
			{
				apiUrl: 'http://localhost/v1.0.0',
				apiRoute: '/posts',
				id: '1',
				url: 'http://localhost/v1.0.0/posts/1'
			},
			{
				apiUrl: '../v1.0.0',
				apiRoute: '/posts',
				id: '1',
				url: '../v1.0.0/posts/1'
			}
		];

		testArray.map(testSet => expect(createUrlWithId(testSet.apiUrl, testSet.apiRoute, testSet.id)).to.be.equal(testSet.url));
	});
});

describe(stripUrlParams.name, () =>
{
	it('strip url params', () =>
	{
		expect(stripUrlParams('http://localhost/v1.0.0/posts/1?cache=1'), 'http://localhost/v1.0.0/posts/1');
		expect(stripUrlParams('../v1.0.0/posts/1?cache=1'), '../v1.0.0/posts/1');
	});
});
