import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { createUrl } from './helper';
import { OptionInterface } from './option.interface';

@Injectable()
export class PutService<T> extends CommonService
{
	public put(id : number | string, body : any, options? : OptionInterface) : Observable<T>
	{
		return this.http.put<T>(createUrl(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
