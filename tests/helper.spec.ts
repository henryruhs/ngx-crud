import { expect } from 'chai';
import { createBaseUrl } from '../src/helper';

describe('Helper', () =>
{
	it('create base url', () =>
	{
		const urlArray : any[] =
		[
			{
				apiUrl: 'http://localhost',
				baseUrl: 'http://localhost/posts',
				endpoint: '/posts',
				id: null
			},
			{
				apiUrl: 'http://localhost/v1.0.0',
				baseUrl: 'http://localhost/v1.0.0/posts/1',
				endpoint: '/posts',
				id: 1
			},
			{
				apiUrl: '..',
				baseUrl: '../posts',
				endpoint: '/posts',
				id: null
			},
			{
				apiUrl: '../v1.0.0',
				baseUrl: '../v1.0.0/posts/1',
				endpoint: '/posts',
				id: 1
			}
		];

		urlArray.forEach(item => expect(createBaseUrl(item.apiUrl, item.endpoint, item.id)).to.be.equal(item.baseUrl));
	});
});
