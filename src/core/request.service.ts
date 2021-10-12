import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionWithBodyInterface } from '../common';
import { CommonService } from '../common';
import { MethodType } from '../common';
import { createUrl } from '../common';

@Injectable()
export class RequestService<T> extends CommonService
{
	/**
	 * fire a non-standard request
	 *
	 * @since 8.0.0
	 *
	 * @param {MethodType} method method of the request
	 * @param {OptionWithBodyInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public request<$ = T | T[]>(method : MethodType, options ?: OptionWithBodyInterface) : Observable<$>
	{
		return this.http.request<$>(method, createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
