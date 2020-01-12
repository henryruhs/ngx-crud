import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { createUrl } from './helper';

@Injectable()
export class GetService<T> extends CommonService
{
	public get(id : number | string, options? : OptionInterface) : Observable<T>
	{
		return this.http.get<T>(createUrl(this.getApiUrl(), this.getEndpoint(), id),
		{
			...this.getOptions(),
			...options
		});
	}

	public find(options? : OptionInterface) : Observable<T[]>
	{
		return this.http.get<T[]>(createUrl(this.getApiUrl(), this.getEndpoint()),
		{
			...this.getOptions(),
			...options
		});
	}
}
