import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { Id } from '../common';
import { createUrlWithId } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class UpdateService<UpdateRequestBody, UpdateResponseBody> extends CommonService
{
	/**
	 * fires a request to completely update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {$UpdateRequestBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$UpdateResponseBody>} http response
	 */

	public update<
		$UpdateRequestBody = UpdateRequestBody,
		$UpdateResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<$UpdateRequestBody>, options ?: Options) : Observable<$UpdateResponseBody>
	{
		return this.http.put<$UpdateResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
