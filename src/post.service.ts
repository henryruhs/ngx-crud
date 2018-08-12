import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PostService extends CommonService
{
	public post(id : string, body : any) : Observable<Response>
	{
		return this.http.post(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'), body);
	}
}
