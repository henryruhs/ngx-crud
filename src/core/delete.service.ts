import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService, Options, Id, createUrlWithId } from '../common';

@Injectable()
export class DeleteService<DeleteResponseBody> extends CommonService
{
	delete<
		ResponseBody = DeleteResponseBody
	>(id : Id, options ?: Options) : Observable<ResponseBody>
	{
		return this.httpClient.delete<ResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id),
		{
			...this.getOptions(),
			...options
		});
	}
}
