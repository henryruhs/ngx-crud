import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class PostService<T> extends CommonService
{
	post(body : any, options? : OptionInterface) : Observable<T>
	{
		return this.http.post<T>(this.createURL(this.apiUrl, this.endpoint), body,
		{
			...this.options,
			...options
		});
	}
}
