import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from '../common/common.interface';
import { CommonService } from '../common/common.service';
import { IdType } from '../common/common.type';
import { createUrlWithId } from './helper';

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
