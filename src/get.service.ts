import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class GetService extends CommonService
{
	public get(id : string) : Observable<Response>
	{
		return this.http.get(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'));
	}
}
