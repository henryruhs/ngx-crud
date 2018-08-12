import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PutService extends CommonService
{
	public put(id : string, body : any) : Observable<Response>
	{
		return this.http.put(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'), body);
	}
}
