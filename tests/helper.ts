import { HttpRequest } from '@angular/common/http';
import { createBaseUrl } from '../src/helper';
import { TestService } from './test.service';

/***
 * mock request
 *
 * @since 7.0.0
 *
 * @param testService TestService
 *
 * @return http request
 */

export function mockRequest(testService : TestService) : HttpRequest<any>
{
	return new HttpRequest('GET', createBaseUrl(testService.getApiUrl(), testService.getEndpoint()),
	{
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
