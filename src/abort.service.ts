import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AbortService
{
	protected store : Subject<void> = new Subject<void>();

	public get() : Observable<void>
	{
		return this.store.asObservable();
	}

	public abort() : void
	{
		this.store.next();
		this.store.complete();
	}
}
