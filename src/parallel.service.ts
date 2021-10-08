import { Injectable } from '@angular/core';
import { forkJoin, Observable, ObservableInput } from 'rxjs';
import { CommonService } from './common/common.service';

@Injectable()
export class ParallelService<T> extends CommonService
{
	/**
	 * fires multiple requests in parallel
	 *
	 * @since 8.0.0
	 *
	 * @param {ObservableInput<$>[]} requestArray collection of requests
	 *
	 * @return {Observable<$[]>} multiple http responses
	 */

	public parallel<$ = T>(requestArray : ObservableInput<$>[]) : Observable<$[]>
	{
		return forkJoin(requestArray);
	}
}
