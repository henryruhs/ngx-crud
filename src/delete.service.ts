import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class DeleteService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	delete(id : number | string, options? : OptionInterface) : Observable<T>
	{
		return this.http.delete<T>(this.createURL(this.apiUrl, this.endpoint, id).toString(),
		{
			...this.options,
			...options
		})
	}
}
