import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService, Options, createUrl } from '../common';

@Injectable()
export class FindService<FindResponseBody> extends CommonService
{
	find<
		ResponseBody = FindResponseBody
	>(options ?: Options) : Observable<ResponseBody>
	{
		return this.httpClient.get<ResponseBody>(createUrl(this.getApiUrl(), this.getApiRoute()),
		{
			...this.getOptions(),
			...options
		});
	}
}
