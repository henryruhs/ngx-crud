import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PostService<T> extends CommonService
{
	post(id : string, body : any, options? : any) : Observable<HttpEvent<T>>
	{
		return this.http.post<T>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'), body, options ? options : this.options);
	}
}
