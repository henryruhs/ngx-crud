import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService, Options, Id, createUrlWithId } from '../common';

@Injectable()
export class ReadService<ReadResponseBody> extends CommonService
{
	read<
		ResponseBody = ReadResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.http.get<ResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
