import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common/common.interface';
import { CommonService } from './common/common.service';
import { IdType } from './common/common.type';
import { createUrlWithId } from './helper';

@Injectable()
export class PutService<T> extends CommonService
{
	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {IdType} id identifier of the resource
	 * @param {BodyInterface} body body of the request
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public put<$ = T>(id : IdType, body : BodyInterface, options ?: OptionInterface) : Observable<$>
	{
		return this.http.put<$>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
