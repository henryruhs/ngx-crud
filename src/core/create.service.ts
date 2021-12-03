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
	 * @param {RequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<ResponseBody>} http response
	 */

	public create<
		RequestBody = CreateRequestBody,
		ResponseBody = CreateResponseBody
	>(body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.http.post<ResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
