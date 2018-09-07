import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { MethodType } from './method.type';
import { OptionInterface } from './option.interface';

@Injectable()
export class RequestService<T> extends CommonService
{
	request(method : MethodType, options? : OptionInterface) : Observable<T[]>
	{
		return this.http.request<T[]>(method, this.createURL(this.apiUrl, this.endpoint),
		{
			...this.options,
			...options
		});
	}
}
