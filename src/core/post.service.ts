import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Options } from '../common';
import { CommonService } from '../common';
import { createUrl } from '../common';

@Injectable()
export class PostService<T> extends CommonService
{
	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Body} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public post<$ = T>(body : Body, options ?: Options) : Observable<$>
	{
		return this.http.post<$>(createUrl(this.getApiUrl(), this.getApiRoute()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
