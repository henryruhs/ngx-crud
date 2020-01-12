import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class PostService<T> extends CommonService
{
	public post(body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.post<T>(createUrl(this.getApiUrl(), this.getEndpoint()), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
