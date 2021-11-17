import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { createUrl } from '../common';

@Injectable()
export class FindService<ResponseBody> extends CommonService
{
	/**
	 * fires a request to find multiple resources
	 *
	 * @since 8.0.0
	 *
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$ResponseBody>} http response
	 */

	public find<$ResponseBody = ResponseBody[]>(options ?: Options) : Observable<$ResponseBody>
	{
		return this.http.get<$ResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
