import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { Id } from '../common';
import { createUrlWithId } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class PatchService<PatchRequestBody, PatchResponseBody> extends CommonService
{
	/**
	 * fires a request to partially update a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {$PatchResponseBody} body body of the request
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$PatchResponseBody>} http response
	 */

	public patch<
		$PatchRequestBody = PatchRequestBody,
		$PatchResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<$PatchRequestBody>, options ?: Options) : Observable<$PatchResponseBody>
	{
		return this.http.patch<$PatchResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
