import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { MethodType } from './method.type';
import { OptionWithBodyInterface } from './option.interface';

@Injectable()
export class RequestService<T> extends CommonService
{
	request(method : MethodType, options? : OptionWithBodyInterface) : Observable<T> | Observable<T[]>
	{
		return this.http.request<any>(method, this.createURL(this.apiUrl, this.endpoint),
		{
			...this.options,
			...options
		});
	}
}
