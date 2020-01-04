import { HttpRequest } from '@angular/common/http';
import { createUrl } from '../src/helper';
import { TestService } from './test.service';

export function mockRequest(testService : TestService) : HttpRequest<any>
{
	return new HttpRequest('GET', createUrl(testService.getApiUrl(), testService.getEndpoint()),
	{
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
