import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PostService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	post(body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.http.post<T>(
		[
			this.apiUrl,
			this.endpoint
		].filter(value => value).join('/'), body, options ? options : this.options);
	}
}
