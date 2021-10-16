import { HttpRequest, HttpContextToken } from '@angular/common/http';
import { createUrl } from '../src';
import { TestService } from './test.service';
import { ContextInterface, TestInterface } from './test.interface';

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
 * @return {HttpRequest<TestInterface>} instance of the http request
 */

export function mockRequest(testService : TestService) : HttpRequest<TestInterface>
{
	return new HttpRequest<TestInterface>('GET', createUrl(testService.getApiUrl(), testService.getEndpoint()),
	{
		context: testService.getContext(),
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
