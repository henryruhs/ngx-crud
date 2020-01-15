import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createBaseUrl } from './helper';

@Injectable()
export class PostService<T> extends CommonService
{
	/**
	 * Fire a request to post non-standard data
	 *
	 * @param body http body
	 * @param options http options
	 *
	 * @return http response as observable
	 */

	public post(body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.post<T>(createBaseUrl(this.getApiUrl(), this.getEndpoint()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
