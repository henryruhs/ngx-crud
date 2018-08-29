import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionsInterface } from './option.interface';

@Injectable()
export class PatchService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	patch(id : number | string, body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.http.patch<T>(this.createURL(this.apiUrl, this.endpoint, id).toString(), body,
		{
			...this.options,
			...options
		});
	}
}
