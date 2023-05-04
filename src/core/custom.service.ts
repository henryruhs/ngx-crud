import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService, OptionsWithBody, Method, createUrl } from '../common';

import { NoInfer } from './crud.type';

@Injectable()
export class CustomService<CustomRequestBody, CustomResponseBody> extends CommonService
{
	custom<
		RequestBody = CustomRequestBody,
		ResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<RequestBody>>) : Observable<ResponseBody>
	{
		return this.httpClient.request<ResponseBody>(method, createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
