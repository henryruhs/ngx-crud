import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createBaseUrl } from './helper';

@Injectable()
export class DeleteService<T> extends CommonService
{
	/**
	 * fire a request to delete a single resource
	 *
	 * @param id identifier of the resource
	 * @param options http options
	 *
	 * @return http response as observable
	 */

	public delete(id : IdType, options? : OptionInterface) : Observable<T>
	{
		return this.http.delete<T>(createBaseUrl(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
