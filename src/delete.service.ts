import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class DeleteService<T> extends CommonService
{
	public delete(id : number | string, options? : OptionInterface) : Observable<T>
	{
		return this.http.delete<T>(this.createURL(this.apiUrl, this.endpoint, id),
		{
			...this.options,
			...options
		});
	}
}
