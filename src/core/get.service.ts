import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from '../common';
import { CommonService } from '../common';
import { IdType } from '../common';
import { createUrlWithId } from '../common';

@Injectable()
export class GetService<T> extends CommonService
{
	/**
	 * fires a request to read a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public get<$ = T>(id : IdType, options ?: OptionInterface) : Observable<$>
	{
		return this.http.get<$>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
