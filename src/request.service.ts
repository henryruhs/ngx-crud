import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionWithBodyInterface } from './common.interface';
import { CommonService } from './common.service';
import { MethodType } from './common.type';
import { createEndpointUrl } from './helper';

@Injectable()
export class RequestService<T> extends CommonService
{
	/**
	 * fire a non-standard request
	 *
	 * @since 2.0.0
	 *
	 * @param method method of the request
	 * @param options options of the request
	 *
	 * @return http response as observable
	 */

	public request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.http.request<T | T[]>(method, createEndpointUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
