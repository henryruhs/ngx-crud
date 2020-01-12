import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class PatchService<T> extends CommonService
{
	public patch(id : number | string, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.patch<T>(createUrl(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
