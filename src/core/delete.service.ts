import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../common';
import { CommonService } from '../common';
import { Id } from '../common';
import { createUrlWithId } from '../common';

@Injectable()
export class DeleteService<DeleteResponseBody> extends CommonService
{
	/**
	 * fires a request to delete a single resource
	 *
	 * @since 8.0.0
	 *
	 * @param {Id} id identifier of the resource
	 * @param {Options} options options of the request
	 *
	 * @return {Observable<$DeleteResponseBody>} http response
	 */

	public delete<
		$DeleteResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<$DeleteResponseBody>
	{
		return this.http.delete<$DeleteResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
