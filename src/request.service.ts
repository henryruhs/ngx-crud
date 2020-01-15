import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionWithBodyInterface } from './common.interface';
import { CommonService } from './common.service';
import { MethodType } from './common.type';
import { createBaseUrl } from './helper';

@Injectable()
export class RequestService<T> extends CommonService
{
	/**
	 * fire a non-standard request
	 *
	 * @param method http method
	 * @param options http options with body support
	 *
	 * @return http response as observable
	 */

	public request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.http.request<T | T[]>(method, createBaseUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
