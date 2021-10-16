import { HttpRequest } from '@angular/common/http';
import { TestService } from './test.service';
import { createUrl } from '../src';
import { ContextInterface } from './test.interface';
import { HttpContextToken } from '@angular/common/http';

const defaultContext : ContextInterface =
{
	before: false,
	after: false
};
const token : HttpContextToken<ContextInterface> = new HttpContextToken<ContextInterface>(() => defaultContext);

/**
 * get the http context token
 *
 * @since 8.0.0
 *
 * @return {HttpContextToken<ContextInterface>} instance of the http context token
 */

export function getToken() : HttpContextToken<ContextInterface>
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
