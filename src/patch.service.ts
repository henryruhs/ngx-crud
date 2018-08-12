import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class PatchService extends CommonService
{
	public patch(id : string, body : any) : Observable<Response>
	{
		return this.http.patch(
		[
			this.apiUrl,
			this.endpoint,
			id
		].join('/'), body);
	}
}
