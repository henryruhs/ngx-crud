import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionsInterface } from './option.interface';

@Injectable()
export class PostService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	post(body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.http.post<T>(this.createURL(this.apiUrl, this.endpoint).toString(), body,
		{
			...this.options,
			...options
		});
	}
}
