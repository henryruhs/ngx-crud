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

export function getToken() : HttpContextToken<Context>
{
	return token;
}

export function mockRequest(testService : TestService) : HttpRequest<ResponseBody>
{
	return new HttpRequest<ResponseBody>('GET', createUrl(testService.getApiUrl(), testService.getApiRoute()),
	{
		context: testService.getContext(),
		headers: testService.getHeaders(),
		params: testService.getParams()
	});
}
