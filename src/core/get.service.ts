import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { Id } from '../common';
import { createUrlWithId } from '../common';

@Injectable()
export class GetService<T> extends CommonService
{
	/**
	 * fires a request to read a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public get<$ = T>(id : Id, options ?: Options) : Observable<$>
	{
		return this.http.get<$>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
