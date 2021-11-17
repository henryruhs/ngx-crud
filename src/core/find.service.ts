import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { createUrl } from '../common';

@Injectable()
export class FindService<FindResponseBody> extends CommonService
{
	/**
	 * fires a request to find multiple resources
	 *
	 * @since 8.0.0
	 *
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$FindResponseBody>} http response
	 */

	public find<
		$FindResponseBody = FindResponseBody | FindResponseBody[]
	>(options ?: Options) : Observable<$FindResponseBody>
	{
		return this.http.get<$FindResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
