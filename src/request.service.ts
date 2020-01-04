import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { createUrl } from './helper';
import { MethodType } from './method.type';
import { OptionWithBodyInterface } from './option.interface';

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
