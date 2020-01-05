import { expect } from 'chai';
import { createUrl } from '../src/helper';

describe('Helper', () =>
{
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
				apiUrl: '..',
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

		urlArray.forEach(item => expect(createUrl(item.apiUrl, item.endpoint, item.id)).to.be.equal(item.url));
	});
});
