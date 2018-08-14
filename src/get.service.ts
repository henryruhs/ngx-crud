import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class GetService<T> extends CommonService
{
	get(id : string, options? : any) : Observable<HttpEvent<T[]>>
	{
		return this.http.get<T[]>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'), options ? options : this.options);
	}
}
