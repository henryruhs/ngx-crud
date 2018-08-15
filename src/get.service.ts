import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class GetService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	get(id : string, options? : any) : Observable<HttpEvent<T[]>>
	{
		return this.http.get<T[]>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'), options ? options : this.options);
	}
}
