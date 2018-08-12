import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';

@Injectable()
export class HeadService extends CommonService
{
	public head() : Observable<Response>
	{
		return this.http.head(
		[
			this.apiUrl,
			this.endpoint
		].join('/'));
	}
}
