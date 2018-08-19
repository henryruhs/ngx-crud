import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionsInterface } from './common.interface';

@Injectable()
export class GetService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	get(id : string, options? : OptionsInterface) : Observable<T>
	{
		return this.http.get<T>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'),
		{
			...this.options,
			...options
		});
	}

	find(options? : OptionsInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(
			[
				this.apiUrl,
				this.endpoint
			].filter(value => value).join('/'),
			{
				...this.options,
				...options
			});
	}
}
