import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class FindService<T> extends CommonService
{
	/**
	 * fires a request to find multiple resources
	 *
	 * @since 5.0.0
	 *
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<T[]>} http response
	 */

	public find(options ?: OptionInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
