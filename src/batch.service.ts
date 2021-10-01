import { Injectable } from '@angular/core';
import { forkJoin, Observable, ObservableInput } from 'rxjs';
import { CommonService } from './common.service';

@Injectable()
export class BatchService<T> extends CommonService
{
	/**
	 * fires multiple requests in parallel
	 *
	 * @since 4.2.0
	 *
	 * @param {ObservableInput<T>[]} requestArray collection of requests
	 *
	 * @return {Observable<T[]>} multiple http responses
	 */

	public parallel(requestArray : ObservableInput<T>[]) : Observable<T[]>
	{
		return forkJoin(requestArray);
	}
}
