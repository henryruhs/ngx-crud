import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { createUrl } from './helper';
import { OptionInterface } from './option.interface';

@Injectable()
export class PostService<T> extends CommonService
{
	public post(body : any, options? : OptionInterface) : Observable<T>
	{
		return this.http.post<T>(createUrl(this.getApiUrl(), this.getEndpoint()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
