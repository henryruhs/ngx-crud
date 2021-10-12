import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from '../common';
import { CommonService } from '../common';
import { IdType } from '../common';
import { createUrlWithId } from '../common';

@Injectable()
export class DeleteService<T> extends CommonService
{
	/**
	 * fires a request to delete a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public delete<$ = T>(id : IdType, options ?: OptionInterface) : Observable<$>
	{
		return this.http.delete<$>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
