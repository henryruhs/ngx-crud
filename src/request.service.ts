import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionWithBodyInterface } from './common.interface';
import { CommonService } from './common.service';
import { MethodType } from './common.type';
import { createUrl } from './helper';

@Injectable()
export class RequestService<T> extends CommonService
{
	public request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T | T[]>
	{
		return this.http.request<T | T[]>(method, createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
