import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PutService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	put(id : string, body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.http.put<T>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'), body, options ? options : this.options);
	}
}
