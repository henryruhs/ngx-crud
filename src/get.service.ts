import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createUrlWithId } from './helper';

@Injectable()
export class GetService<T> extends CommonService
{
	/**
	 * fires a request to read a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param id identifier of the resource
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public get(id : IdType, options ?: OptionInterface) : Observable<T>
	{
		return this.http.get<T>(createUrlWithId(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
