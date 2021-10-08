import { HttpRequest } from '@angular/common/http';
import { TestService } from './test.service';
import { createUrl } from '../src/core';

/**
 * mock request for test service
 *
 * @since 4.0.0
 *
 * @param {TestService} testService TestService
 *
 * @return {HttpRequest<any>} instance of the http request
 */

export function mockRequest(testService : TestService) : HttpRequest<any>
{
	return new HttpRequest('GET', createUrl(testService.getApiUrl(), testService.getEndpoint()),
	{
		context: testService.getContext(),
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
