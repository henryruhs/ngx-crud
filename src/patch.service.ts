import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createBaseUrl } from './helper';

@Injectable()
export class PatchService<T> extends CommonService
{
	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public patch(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.patch<T>(createBaseUrl(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
