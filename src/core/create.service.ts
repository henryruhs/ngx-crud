import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { createUrl } from '../common';

@Injectable()
export class CreateService<RequestBody, ResponseBody> extends CommonService
{
	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {$RequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$ResponseBody>} http response
	 */

	public create<
		$RequestBody extends RequestBody,
		$ResponseBody extends ResponseBody
	>(body : $RequestBody, options ?: Options) : Observable<$ResponseBody>
	{
		return this.http.post<$ResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
