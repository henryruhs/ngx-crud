import { HttpRequest, HttpContextToken } from '@angular/common/http';
import { createUrl } from '../src';
import { TestService } from './test.service';
import { Context, ResponseBody } from './test.interface';

const defaultContext : Context =
{
	before: false,
	after: false
};
const token : HttpContextToken<Context> = new HttpContextToken<Context>(() => defaultContext);

/**
 * get the http context token
 *
 * @since 8.0.0
 *
 * @return {HttpContextToken<Context>} instance of the http context token
 */

export function getToken() : HttpContextToken<Context>
{
	return token;
}

/**
 * mock request for test service
 *
 * @since 4.0.0
 *
 * @param {TestService} testService TestService
 *
 * @return {HttpRequest<ResponseBody>} instance of the http request
 */

export function mockRequest(testService : TestService) : HttpRequest<ResponseBody>
{
	return new HttpRequest<ResponseBody>('GET', createUrl(testService.getApiUrl(), testService.getApiRoute()),
	{
		context: testService.getContext(),
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
