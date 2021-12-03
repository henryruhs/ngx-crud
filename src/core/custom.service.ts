import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Method } from '../common';
import { createUrl } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class CustomService<CustomRequestBody, CustomResponseBody> extends CommonService
{
	/**
	 * fire a custom request
	 *
	 * @since 10.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody<RequestBody>} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	public custom<
		RequestBody = CustomRequestBody,
		ResponseBody = CustomResponseBody
	>(method : Method, options ?: OptionsWithBody<NoInfer<RequestBody>>) : Observable<ResponseBody>
	{
		return this.http.request<ResponseBody>(method, createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
