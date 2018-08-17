import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { OptionsInterface } from './common.interface';

@Injectable()
export class DeleteService<T> extends CommonService
{
	constructor(protected http : HttpClient)
	{
		super();
		this.clear();
	}

	delete(id : string, options? : OptionsInterface) : Observable<T>
	{
		return this.http.delete<T>(
		[
			this.apiUrl,
			this.endpoint,
			id
		].filter(value => value).join('/'), options ? options : this.options);
	}
}
