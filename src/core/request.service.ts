import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsWithBody } from '../common';
import { CommonService } from '../common';
import { Method } from '../common';
import { createUrl } from '../common';

@Injectable()
export class RequestService<T> extends CommonService
{
	/**
	 * fire a non-standard request
	 *
	 * @since 8.0.0
	 *
	 * @param {Method} method method of the request
	 * @param {OptionsWithBody} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public request<$ = T | T[]>(method : Method, options ?: OptionsWithBody) : Observable<$>
	{
		return this.http.request<$>(method, createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
