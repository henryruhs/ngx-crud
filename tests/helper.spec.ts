import { expect } from 'chai';
import { createUrl } from '../src';

describe('Helper', () =>
{
	it('create endpoint url', () =>
	{
		const urlArray : any[] =
		[
			{
				apiUrl: 'http://localhost',
				endpoint: '/posts',
				endpointUrl: 'http://localhost/posts',
				id: null
			},
			{
				apiUrl: 'http://localhost/v1.0.0',
				endpoint: '/posts',
				endpointUrl: 'http://localhost/v1.0.0/posts/1',
				id: 1
			},
			{
				apiUrl: '..',
				endpoint: '/posts',
				endpointUrl: '../posts',
				id: null
			},
			{
				apiUrl: '../v1.0.0',
				endpoint: '/posts',
				endpointUrl: '../v1.0.0/posts/1',
				id: 1
			}
		];

		urlArray.forEach(item => expect(createUrl(item.apiUrl, item.endpoint, item.id)).to.be.equal(item.endpointUrl));
	});
});
