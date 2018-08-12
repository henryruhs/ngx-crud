import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class DeleteService extends CommonService
{
	public delete(id : string) : Observable<Response>
	{
		return this.http.delete(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'));
	}
}
