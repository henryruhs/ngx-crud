import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createUrlWithId } from './helper';

@Injectable()
export class DeleteService<T> extends CommonService
{
	/**
	 * fires a request to delete a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T>} http response
	 */

	public delete(id : IdType, options ?: OptionInterface) : Observable<T>
	{
		return this.http.delete<T>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
