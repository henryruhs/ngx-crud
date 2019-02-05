import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class GetService<T> extends CommonService
{
	public get(id : number | string, options? : OptionInterface) : Observable<T>
	{
		return this.http.get<T>(this.createURL(this.apiUrl, this.endpoint, id),
		{
			...this.options,
			...options
		});
	}

	public find(options? : OptionInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(this.createURL(this.apiUrl, this.endpoint),
		{
			...this.options,
			...options
		});
	}
}
