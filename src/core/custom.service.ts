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
	 * @param {OptionsWithBody<$CustomRequestBody>} options options of the request
	 *
	 * @return {Observable<$CustomResponseBody>} http response
	 */

	public custom<
		$CustomRequestBody = CustomRequestBody,
		$CustomResponseBody = CustomResponseBody | CustomResponseBody[],
	>(method : Method, options ?: OptionsWithBody<NoInfer<$CustomRequestBody>>) : Observable<$CustomResponseBody>
	{
		return this.http.request<$CustomResponseBody>(method, createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
