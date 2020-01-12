import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BodyInterface, OptionInterface } from './common.interface';
import { CommonService } from './common.service';
import { IdType } from './common.type';
import { createUrl } from './helper';

@Injectable()
export class PutService<T> extends CommonService
{
	public put(id : IdType, body : BodyInterface, options? : OptionInterface) : Observable<T>
	{
		return this.http.put<T>(createUrl(this.getApiUrl(), this.getEndpoint(), id), body,
		{
			...this.getOptions(),
			...options
		});
	}
}
