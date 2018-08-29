import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionsInterface } from './option.interface';

@Injectable()
export class GetService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	get(id : number | string, options? : OptionsInterface) : Observable<T>
	{
		return this.http.get<T>(this.createURL(this.apiUrl, this.endpoint, id).toString(),
		{
			...this.options,
			...options
		});
	}

	find(options? : OptionsInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(this.createURL(this.apiUrl, this.endpoint).toString(),
			{
				...this.options,
				...options
			});
	}
}
