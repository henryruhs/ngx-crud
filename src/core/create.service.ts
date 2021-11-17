import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { createUrl } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class CreateService<CreateRequestBody, CreateResponseBody> extends CommonService
{
	/**
	 * fires a request to create a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {$CreateRequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$CreateResponseBody>} http response
	 */

	public create<
		$CreateRequestBody = CreateRequestBody,
		$CreateResponseBody = CreateResponseBody
	>(body : NoInfer<$CreateRequestBody>, options ?: Options) : Observable<$CreateResponseBody>
	{
		return this.http.post<$CreateResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
