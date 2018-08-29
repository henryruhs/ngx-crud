import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class PutService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	put(id : number | string, body : any, options? : OptionInterface) : Observable<T>
	{
		return this.http.put<T>(this.createURL(this.apiUrl, this.endpoint, id).toString(), body,
		{
			...this.options,
			...options
		});
	}
}
