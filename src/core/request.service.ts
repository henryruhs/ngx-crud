import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Method } from '../common';
import { createUrl } from '../common';

@Injectable()
export class RequestService<RequestRequestBody, RequestResponseBody> extends CommonService
{
	/**
	 * fire a non-standard request
	 *
	 * @since 8.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody<$RequestRequestBody>} options options of the request
	 *
	 * @return {Observable<$RequestResponseBody>} http response
	 */

	public request<
		$RequestRequestBody = RequestRequestBody,
		$RequestResponseBody = RequestResponseBody | RequestResponseBody[]
	>(method : Method, options ?: OptionsWithBody<$RequestRequestBody>) : Observable<$RequestResponseBody>
	{
		return this.http.request<$RequestResponseBody>(method, createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
