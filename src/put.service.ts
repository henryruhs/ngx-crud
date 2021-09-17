import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createUrlWithId } from './helper';

@Injectable()
export class PutService<T> extends CommonService
{
	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public put(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.put<T>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
