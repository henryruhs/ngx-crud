import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createBaseUrl } from './helper';

@Injectable()
export class GetService<T> extends CommonService
{
	/**
	 * fire a request to read a single resource
	 *
	 * @param id identifier of the resource
	 * @param options http options
	 *
	 * @return http response as observable
	 */

	public get(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.http.get<T>(createBaseUrl(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}

	/**
	 * fire a request to find multiple resources
	 *
	 * @param options http options
	 *
	 * @return http response as observable
	 */

	public find(options? : OptionInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(createBaseUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
