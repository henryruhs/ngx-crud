import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from '../common';
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
	 * @param {BodyInterface} body body of the request
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public post<$ = T>(body : BodyInterface, options ?: OptionInterface) : Observable<$>
	{
		return this.http.post<$>(createUrl(this.getApiUrl(), this.getEndpoint()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
