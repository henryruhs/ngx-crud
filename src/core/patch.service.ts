import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService, Options, Id, createUrlWithId } from '../common';
import { NoInfer } from './crud.type';

@Injectable()
export class PatchService<PatchRequestBody, PatchResponseBody> extends CommonService
{
	patch<
		RequestBody = PatchRequestBody,
		ResponseBody = PatchResponseBody
	>(id : Id, body : NoInfer<RequestBody>, options ?: Options) : Observable<ResponseBody>
	{
		return this.http.patch<ResponseBody>(createUrlWithId(this.getApiUrl(), this.getApiRoute(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
