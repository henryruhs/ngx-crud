import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService, Options, Id, createUrlWithId } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class UpdateService<UpdateRequestBody, UpdateResponseBody> extends CommonService
{
	update<
		RequestBody = UpdateRequestBody,
		ResponseBody = UpdateResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.http.put<ResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
