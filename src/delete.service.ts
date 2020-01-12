import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class DeleteService<T> extends CommonService
{
	public delete(id : number | string, options? : OptionInterface) : Observable<T>
	{
		return this.http.delete<T>(createUrl(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
