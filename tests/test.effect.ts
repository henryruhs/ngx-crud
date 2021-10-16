import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { ObserveEffectInterface } from '../src';
import { getToken } from './test.helper';

@Injectable()
export class TestEffect implements ObserveEffectInterface
{
	before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		request.context.set(getToken(),
		{
			before: true,
			after: false
		});
		return request;
	}

	after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : void
	{
		if (response.ok)
		{
			request.context.set(getToken(),
			{
				before: request.context.get(getToken()).before,
				after: true
			});
		}
	}
}
