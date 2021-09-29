import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class PostService<T> extends CommonService
{
	/**
	 * fires a request to create a single resource
	 *
	 * @since 1.0.0
	 *
	 * @param body body of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public post(body : BodyInterface, options ?: OptionInterface) : Observable<T>
	{
		return this.http.post<T>(createUrl(this.getApiUrl(), this.getEndpoint()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
