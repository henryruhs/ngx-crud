import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Options } from '../common';
import { CommonService } from '../common';
import { Id } from '../common';
import { createUrlWithId } from '../common';

@Injectable()
export class UpdateService<T> extends CommonService
{
	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Body} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public update<$ = T>(id : Id, body : Body, options ?: Options) : Observable<$>
	{
		return this.http.put<$>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
