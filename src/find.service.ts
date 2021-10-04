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
	 * @since 8.0.0
	 *
	 * @param {OptionInterface} options options of the request
	 *
	 * @return {Observable<$>} http response
	 */

	public find<$ = T[]>(options ?: OptionInterface) : Observable<$>
	{
		return this.http.get<$>(createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
